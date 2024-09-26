import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import hospitaldata from '../database.js';

export default function Infosmall({ id }) {
  const hospital = hospitaldata.find(h => h.id === id);
  if (!hospital) return <div>Hospital not found</div>;

  const { name, speciality, address, url, status } = hospital;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let intervalId;
    if (isHovered && url.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % url.length);
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, url.length]);

  const handleButtonClick = () => {
    if (status === 'approved') {
      toast.success('You have already approved this hospital.');
    } else {
      if (location.pathname.includes('verify-hospital')) {
        navigate(`/verify-specific-hospital/${id}`);
      }
      if (location.pathname.includes('multi-hospital')) {
        navigate(`/specific-hospital/${id}`);
      }
    }
  };

  return (
    <div
      className="group relative hover:cursor-pointer w-72 h-96 overflow-hidden shadow-2xl bg-blue-100 rounded-3xl transition-all transform hover:scale-105 hover:shadow-3xl hover:-translate-y-2 duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={url[isHovered ? currentImageIndex : 0]}
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
          className={`relative w-full py-2 px-4 rounded-3xl transition-transform duration-300 ease-in-out group-hover:scale-110 focus:outline-none bg-emerald-200 hover:bg-emerald-300 text-black font-bold`
          }
        >
        VIEW
        </button>
      </div>
    </div>
  );
}
