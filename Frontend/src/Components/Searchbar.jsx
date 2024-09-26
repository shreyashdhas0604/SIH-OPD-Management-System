import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function Searchbar({ onSearch, onFilterChange }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [status, setStatus] = React.useState("");

  const location = useLocation(); // Get the current URL

  const specialities = [
    "Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics", "Gynecology & Obstetrics",
    "Dermatology", "Gastroenterology", "Pulmonology", "Endocrinology", "Nephrology", "Urology",
    "Ophthalmology", "ENT (Ear, Nose, and Throat)", "Rheumatology", "Psychiatry", "General Surgery",
    "Plastic and Reconstructive Surgery", "Anesthesiology", "Radiology", "Hematology",
    "Emergency Medicine", "Geriatrics", "Infectious Disease", "Palliative Care"
  ];

  const statuses = ["pending", "approved", "disapproved"];

  return (
    <div className="flex justify-center items-center p-4 bg-blue-100">
      {/* Show the search and filter by speciality functionality if URL contains 'multi-hospital' */}
      {location.pathname.includes('multi-hospital') && (
        <div className="flex items-center gap-6">
          <div className="flex items-center border-b border-emerald-700 py-2">
            <input
              className="appearance-none bg-transparent border-none text-gray-700 placeholder-gray-500 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search for hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="ml-2 flex-shrink-0 bg-emerald-300 hover:bg-emerald-400 text-white text-sm border-emerald-600 hover:border-emerald-700 py-1 px-2 rounded transition-all duration-300 flex items-center justify-center"
              onClick={() => onSearch(searchTerm)}
            >
              <FaSearch className="text-lg hover:text-xl transition-transform duration-300" />
            </button>
          </div>

          <div>
            <select
              className="bg-transparent border border-emerald-700 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 transition-all duration-300"
              value={speciality}
              onChange={(e) => {
                setSpeciality(e.target.value);
                onFilterChange(e.target.value);
              }}
            >
              <option value="">Filter by Speciality</option>
              {specialities.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Show the filter by status functionality if URL contains 'verify-hospital' */}
      {location.pathname.includes('verify-hospital') && (
        <div className="ml-auto mr-10">
          <select
            className="bg-transparent border border-emerald-700 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 transition-all duration-300"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              onFilterChange(e.target.value);
            }}
          >
            <option className="bg-transparent" value="">Filter by Status</option>
            {statuses.map((stat, index) => (
              <option className="bg-transparent" key={index} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
