import React, { useState } from 'react';
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Infosmall from '../Components/Infosmall.jsx';
import Searchbar from '../Components/Searchbar.jsx';
import hospitaldata from '../database.js';
import { toast } from 'react-hot-toast';

export default function Multihospital() {
  const [filteredHospitals, setFilteredHospitals] = useState(hospitaldata);

  const handleSearch = (query) => {
    const results = hospitaldata.filter(hospital =>
      hospital.name.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
      toast.error("No such results found");
    }
    setFilteredHospitals(results.length > 0 ? results : hospitaldata);
  };

  const handleFilterChange = (speciality) => {
    setFilteredHospitals(hospitaldata.filter(hospital =>
      speciality === "" || hospital.speciality === speciality
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Searchbar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="bg-gray-50 flex flex-wrap justify-center gap-4 p-4">
        {filteredHospitals.map(hospital => (
          <Infosmall key={hospital.id} id={hospital.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
