import React, { useState, useEffect } from 'react';
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import hospitaldata from '../database.js';
import Searchbar from '../Components/Searchbar.jsx';
import VerifyInfo from '../Components/VerifyInfo.jsx';

export default function Verifyhospitals() {
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  // Show only pending hospitals by default
  useEffect(() => {
    const pendingHospitals = hospitaldata.filter(hospital => hospital.status === 'pending');
    setFilteredHospitals(pendingHospitals);
  }, []);

  // Handle filtering based on selected status
  const handleFilterChange = (status) => {
    if (status) {
      const filtered = hospitaldata.filter(hospital => hospital.status === status);
      setFilteredHospitals(filtered);
    } else {
      // If no status is selected, show pending by default
      const pendingHospitals = hospitaldata.filter(hospital => hospital.status === 'pending');
      setFilteredHospitals(pendingHospitals);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Searchbar onFilterChange={handleFilterChange} />
      <div className="bg-gray-50 flex flex-wrap justify-center gap-4 p-4">
        {filteredHospitals.map(hospital => (
          <VerifyInfo key={hospital.id} id={hospital.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
