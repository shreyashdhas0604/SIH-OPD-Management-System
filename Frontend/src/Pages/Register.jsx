import React, { useState,useEffect } from 'react';
import apiClient from '../api/ApiClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Patient', // Default role set to 'Patient'
    contactNumber: '',
    avatar: '', // Will be set by the image upload
    age: '',
    gender: '',
    address: '',
    insuranceCard: '',
    rationCard: '',
    permanentIllness: '',
    disabilityStatus: '',
    specialization: '',
    qualification: '',
    experience: '',
    hospitalID: '',
    departmentId: '',
  });

  const [avatarFile, setAvatarFile] = useState(null); // To store selected image file
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
    const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch hospitals and departments when the component mounts
    const fetchDropdownData = async () => {
      try {
        const [hospitalsResponse, departmentsResponse] = await Promise.all([
          apiClient.get('/hospital/hospitals'),
          (userDetails.hospitalID && apiClient.get(`/hospital/${userDetails.hospitalID}/departments`)) || null,
        ]);
        if(departmentsResponse){
          setDepartments(departmentsResponse.data.message);
        }
        setHospitals(hospitalsResponse.data.message);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
    //make reference to the userDetails.hospitalID to get the departments of the selected hospital
  }, [ userDetails.hospitalID ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.keys(userDetails).forEach((key) => {
        formData.append(key, userDetails[key]);
      });

      // Append the avatar image to the form data
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      console.log("formData : ", formData);

      const user = await apiClient.post('/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("user : ", user);

      if(userDetails.role === 'Doctor'){
      const doctor = await apiClient.post('/doctor/register', {
        specialization: userDetails.specialization,
        qualification: userDetails.qualification,
        experience: userDetails.experience,
        hospitalID: userDetails.hospitalID,
        userID: user.data.user.id,
        departmentId: userDetails.departmentId,
      });
    }
    toast("Registering ...")
    setTimeout(() => {
      navigate('/login')
    },3000);
      setMessage({ type: 'success', text: 'User registered successfully!' });

    
    setUserDetails({
      username: '',
      email: '',
      password: '',
      role: 'Patient', // Reset role to default
      contactNumber: '',
      avatar: '',
      age: '',
      gender: '',
      address: '',
      insuranceCard: '',
      rationCard: '',
      permanentIllness: '',
      disabilityStatus: '',
    });
    setAvatarFile(null);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center py-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">User Registration</h2>
        {message.text && (
          <div
            className={`text-center p-3 mb-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            } rounded-lg`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={userDetails.contactNumber}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Avatar Image */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Avatar</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              accept="image/*"
            />
            {avatarFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Role</label>
            <select
              name="role"
              value={userDetails.role}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {userDetails.role === 'Doctor' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-600">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={userDetails.specialization}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter specialization"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={userDetails.qualification}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter qualification"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={userDetails.experience}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter years of experience"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">Hospital</label>
                <select
                  name="hospitalID"
                  value={userDetails.hospitalID}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">Department</label>
                <select
                  name="departmentId"
                  value={userDetails.departmentId}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Optional Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Age</label>
              <input
                type="number"
                name="age"
                value={userDetails.age}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-600">Gender</label>
              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-600">Insurance Card</label>
              <input
                type="text"
                name="insuranceCard"
                value={userDetails.insuranceCard}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter insurance card"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Ration Card</label>
              <input
                type="text"
                name="rationCard"
                value={userDetails.rationCard}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter ration card"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-600">Permanent Illness</label>
              <input
                type="text"
                name="permanentIllness"
                value={userDetails.permanentIllness}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter permanent illness"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-600">Disability Status</label>
            <input
              type="text"
              name="disabilityStatus"
              value={userDetails.disabilityStatus}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter disability status"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;




// import React, { useState, useEffect } from 'react';
// import apiClient from '../api/ApiClient';

// const UserRegistrationForm = () => {
//   const [userDetails, setUserDetails] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Patient', // Default role set to 'Patient'
//     contactNumber: '',
//     avatar: '', // Will be set by the image upload
//     age: '',
//     gender: '',
//     address: '',
//     insuranceCard: '',
//     rationCard: '',
//     permanentIllness: '',
//     disabilityStatus: '',
//     specialization: '',
//     qualification: '',
//     experience: '',
//     hospitalID: '',
//     departmentId: '',
//   });
//   const [avatarFile, setAvatarFile] = useState(null); // To store selected image file
//   const [hospitals, setHospitals] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   useEffect(() => {
//     // Fetch hospitals and departments when the component mounts
//     const fetchDropdownData = async () => {
//       try {
//         const [hospitalsResponse, departmentsResponse] = await Promise.all([
//           apiClient.get('/hospital/hospitals'),
//           (userDetails.hospitalID && apiClient.get(`/hospital/${userDetails.hospitalID}/departments`)) || null,
//         ]);
//         if(departmentsResponse){
//           setDepartments(departmentsResponse.data.message);
//         }
//         setHospitals(hospitalsResponse.data.message);
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdownData();
//     //make reference to the userDetails.hospitalID to get the departments of the selected hospital
//   }, [ userDetails.hospitalID ]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...userDetails,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatarFile(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       const formData = new FormData();
//       Object.keys(userDetails).forEach((key) => {
//         formData.append(key, userDetails[key]);
//       });

//       // Append the avatar image to the form data
//       if (avatarFile) {
//         formData.append('avatar', avatarFile);
//       }

//       await apiClient.post('/user/register', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setMessage({ type: 'success', text: 'User registered successfully!' });
//       setUserDetails({
//         username: '',
//         email: '',
//         password: '',
//         role: 'Patient', // Reset role to default
//         contactNumber: '',
//         avatar: '',
//         age: '',
//         gender: '',
//         address: '',
//         insuranceCard: '',
//         rationCard: '',
//         permanentIllness: '',
//         disabilityStatus: '',
//         specialization: '',
//         qualification: '',
//         experience: '',
//         hospitalID: '',
//         departmentId: '',
//       });
//       setAvatarFile(null);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong!' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center py-6">
//       <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">User Registration</h2>
//         {message.text && (
//           <div
//             className={`text-center p-3 mb-4 ${
//               message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//             } rounded-lg`}
//           >
//             {message.text}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Common Fields */}
//           <div>
//             <label className="block text-lg font-medium text-gray-600">Role</label>
//             <select
//               name="role"
//               value={userDetails.role}
//               onChange={handleInputChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               <option value="Patient">Patient</option>
//               <option value="Doctor">Doctor</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>

//           {/* Doctor-Specific Fields */}
//           {userDetails.role === 'Doctor' && (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium text-gray-600">Specialization</label>
//                 <input
//                   type="text"
//                   name="specialization"
//                   value={userDetails.specialization}
//                   onChange={handleInputChange}
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter specialization"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium text-gray-600">Qualification</label>
//                 <input
//                   type="text"
//                   name="qualification"
//                   value={userDetails.qualification}
//                   onChange={handleInputChange}
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter qualification"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium text-gray-600">Experience (years)</label>
//                 <input
//                   type="number"
//                   name="experience"
//                   value={userDetails.experience}
//                   onChange={handleInputChange}
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter years of experience"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium text-gray-600">Hospital</label>
//                 <select
//                   name="hospitalID"
//                   value={userDetails.hospitalID}
//                   onChange={handleInputChange}
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 >
//                   <option value="">Select Hospital</option>
//                   {hospitals.map((hospital) => (
//                     <option key={hospital.id} value={hospital.id}>
//                       {hospital.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium text-gray-600">Department</label>
//                 <select
//                   name="departmentId"
//                   value={userDetails.departmentId}
//                   onChange={handleInputChange}
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((department) => (
//                     <option key={department.id} value={department.id}>
//                       {department.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             disabled={loading}
//           >
//             {loading ? 'Registering...' : 'Register User'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserRegistrationForm;
