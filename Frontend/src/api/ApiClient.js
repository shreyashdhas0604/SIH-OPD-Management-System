import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust to your API base URL
  withCredentials: true, // Include cookies for HttpOnly refresh token
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor to attach the access token to requests
apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken'); // Get the access token from local storage
  console.log("authToken in apiClient.interceptors.request.use : ", authToken);
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`; // Attach the token
  }
  return config;
});

// Interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is due to an expired token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request if a token refresh is already in progress
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return await apiClient(originalRequest);
        } catch (err) {
          return await Promise.reject(err);
        }
      }

      originalRequest._retry = true; // Mark request to avoid retrying repeatedly
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshAccessToken()
          .then((newAccessToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            processQueue(null, newAccessToken);
            resolve(apiClient(originalRequest)); // Retry original request
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error); // For other errors, reject the promise
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/user/refresh-token',
      {refreshToken : localStorage.getItem('refreshToken')},
      { withCredentials: true } // Ensure cookies are sent
    );
    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem('authToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
};


// export const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       'http://localhost:5000/api/user/refresh-token',
//       null,
//       { withCredentials: true }
//     );

//     const newAccessToken = response.data.accessToken;
//     localStorage.setItem('authToken', newAccessToken); // Store the new access token
//     return newAccessToken;
//   } catch (error) {
//     console.error('Failed to refresh access token:', error);
//     throw error; // Handle the error by logging out or similar action
//   }
// };

export default apiClient;
