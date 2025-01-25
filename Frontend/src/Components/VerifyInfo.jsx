import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../api/ApiClient.js'; // Ensure correct import path
import { set } from 'date-fns';

export default function VerifyInfo({ id }) {
  const [hospital, setHospital] = useState(null); // State for hospital data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await apiClient.get(`/hospital/hospital/${id}`);
        setHospital(response.data); // Set fetched data in state
      } catch (err) {
        setError('Failed to fetch hospital data.');
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalData();
  }, [id]);

  useEffect(() => {
    let intervalId;
    if (isHovered && hospital?.hospitalImageUrl?.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % hospital.hospitalImageUrl.length
        );
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, hospital]);

  const handleButtonClick = () => {
    if (hospital?.isVerified === 'Approved') {
      toast.success('Hospital is already approved. Redirecting for verifying again...');
      setTimeout(() => {
        if (location.pathname.includes('verify-hospital')) {
          navigate(`/verify-specific-hospital/${id}`);
        }
      }, 2000);
    } else if (hospital?.isVerified === 'Disapproved') {
      toast.error('Hospital was disapproved !!');
      toast('Redirecting for verifying again...');
      setTimeout(() => {
        if (location.pathname.includes('verify-hospital')) {
          navigate(`/verify-specific-hospital/${id}`);
        }
      }, 2000);
    } else {
      if (location.pathname.includes('verify-hospital')) {
        navigate(`/verify-specific-hospital/${id}`);
      }
    }
  };

  // Handle loading, error, or no data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hospital) return <div>Hospital not found</div>;

  const { name, speciality, address, hospitalImageUrl, isVerified } = hospital;

  const getButtonText = () => {
    if (isVerified === 'Approved') return 'Approved';
    if (isVerified === 'Disapproved') return 'Disapproved';
    if (isVerified === 'Pending') return 'Pending Approval';
    return 'Verify';
  };

  const getButtonStyle = () => {
    if (isVerified === 'Approved') return 'bg-green-300 text-white cursor-not-allowed';
    if (isVerified === 'Disapproved') return 'bg-red-300 text-white cursor-not-allowed';
    if (isVerified === 'Pending') return 'bg-yellow-300 text-black';
    return 'bg-emerald-200 hover:bg-emerald-300 text-black';
  };

  const getVerifyAgainButtonStyle = () => {
    return 'relative w-full py-2 px-4 rounded-3xl transition-transform duration-300 ease-in-out group-hover:scale-110 focus:outline-none bg-gray-400 hover:bg-gray-500 text-black font-bold'
    // return 'bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded-3xl transition-transform duration-300 ease-in-out';
  };

  return (
    <div
      className="group relative hover:cursor-pointer w-72 h-auto overflow-hidden shadow-2xl bg-blue-100 rounded-3xl transition-all transform hover:scale-105 hover:shadow-3xl hover:-translate-y-2 duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={hospitalImageUrl?.[isHovered ? currentImageIndex : 0]}
          alt={name}
          className="mx-auto w-200 h-full object-cover rounded-3xl transition-opacity duration-500 ease-in-out transform group-hover:scale-110 mt-2"
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-900 truncate transition-colors duration-300 group-hover:text-blue-800">
          {name}
        </h2>
        <p className="text-gray-700 text-base mb-2 truncate">
          <strong>Speciality:</strong> {speciality}
        </p>
        <p className="text-gray-700 text-base whitespace-normal break-words">
          <strong>Address:</strong> {address}
        </p>
      </div>
      <div className="px-6 py-2">
        <button
          onClick={handleButtonClick}
          className={`relative w-full py-2 px-4 rounded-3xl transition-transform duration-300 ease-in-out group-hover:scale-110 focus:outline-none ${getButtonStyle()}`}
          disabled={isVerified === 'Approved' || isVerified === 'Disapproved'}
        >
          {getButtonText()}
        </button>
      </div>
      {(isVerified === 'Approved' || isVerified === 'Disapproved') && (
        <div className="px-6 py-2">
          <button
            onClick={handleButtonClick}
            className={`relative w-full ${getVerifyAgainButtonStyle()}`}
          >
            Verify Again
          </button>
        </div>
      )}
    </div>
  );
}
