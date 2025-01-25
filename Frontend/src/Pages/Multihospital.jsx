import React, { useState, useEffect } from 'react';
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Infosmall from '../Components/Infosmall.jsx';
import Searchbar from '../Components/Searchbar.jsx';
import apiClient from '../api/ApiClient.js';
import { toast } from 'react-hot-toast';

export default function Multihospital() { 
  const [filteredHospitals, setFilteredHospitals] = useState([]);  // Initially empty, will be filled with API data
  const [allHospitals, setAllHospitals] = useState([]);  // State to store all hospitals data

  useEffect(() => {
    // Fetching the hospital data asynchronously inside useEffect
    const fetchHospitals = async () => {
      try {
        const response = await apiClient.get('/hospital/hospitals');
        console.log(response.data.message);  // Logging the message from the response
        setAllHospitals(response.data.message || []);  // Save the hospitals data in state
        setFilteredHospitals(response.data.message || []);  // Initialize filteredHospitals with the fetched data
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to load hospital data.");
      }
    };

    fetchHospitals();  // Call the function to fetch data on component mount
  }, []);  // Empty dependency array ensures this only runs once when the component mounts

  const handleSearch = (query) => {
    const results = allHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
      toast.error("No such results found");
    }
    setFilteredHospitals(results.length > 0 ? results : allHospitals);
  };

  const handleFilterChange = (speciality) => {
    setFilteredHospitals(allHospitals.filter(hospital =>
      speciality === "" || hospital.speciality === speciality
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Searchbar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="bg-gray-50 flex flex-wrap justify-center gap-4 p-4">
        {filteredHospitals.map(hospital => (
          <Infosmall key={hospital.id} id={hospital.id} hospitals={filteredHospitals}/>
        ))}
      </div>
      <Footer />
    </div>
  );
}
  