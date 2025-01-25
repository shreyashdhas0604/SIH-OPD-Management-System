// src/components/Logout.jsx
import React from 'react';
import apiClient from '../api/ApiClient'; // Importing the apiClient

const Logout = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Corrected token retrieval
      await apiClient.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('User logged out successfully!');
      localStorage.removeItem('authToken'); // Remove token from storage
      localStorage.removeItem('user'); // Optionally remove user data
    } catch (error) {
      console.error('Error logging out', error);
      alert('Error logging out.');
    }
  };

  return (
    <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default Logout;
