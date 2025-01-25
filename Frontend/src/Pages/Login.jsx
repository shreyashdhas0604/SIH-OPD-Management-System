import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient"; // Importing the apiClient
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/user/login", credentials);

      const token = response.headers["authorization"];

      console.log("token : ", token);

      // Extracting the token
      if (token && token.startsWith("Bearer ")) {
        const extractedToken = token.split(" ")[1];
        localStorage.setItem("authToken", extractedToken); // Save to localStorage
      }

      alert("User logged in successfully!");
      console.log("user data : ", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      toast.success("Logged in successfully! Redirecting ...");
      setTimeout(() => { navigate("/"); }, 2000);
    } catch (error) {
      console.error("Error logging in", error);
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-100">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-purple-600 hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={handleRegister}
            className="text-sm text-purple-600 hover:underline"
          >
            New User? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
