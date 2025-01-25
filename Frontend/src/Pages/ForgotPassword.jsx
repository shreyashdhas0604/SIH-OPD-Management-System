import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP & password reset
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post("/user/forgot-password", { email });
      toast.success(response.data.message || "OTP sent to your email.");
      setStep(2); // Move to OTP entry and password reset step
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post("/user/reset-password", {
        email,
        otp,
        newPassword,
      });
      console.log(response);
      if(response.data.statusCode === 200){
        apiClient.post("/user/login", { email, password: newPassword });
        toast.success("You are Logged in !! Password reset successfully. Redirecting to Home page...");
      }
      setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
    } catch (err) {
      if (err.response?.data?.error === "Invalid OTP") {
        toast.error("The OTP you entered is incorrect. Please try again.");
      } else if (err.response?.data?.error === "OTP expired") {
        toast.error("The OTP has expired. Please request a new one.");
      } else {
        toast.error(err.response?.data?.error || "Failed to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Forgot Password
        </h1>

        {step === 1 ? (
          <form onSubmit={handleSubmitEmail}>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg shadow-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 transition-colors duration-300"
              }`}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg shadow-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 transition-colors duration-300"
              }`}
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-sm text-teal-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
