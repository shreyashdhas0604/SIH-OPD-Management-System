import React, { useState, useEffect } from 'react';
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Searchbar from '../Components/Searchbar.jsx';
import VerifyInfo from '../Components/VerifyInfo.jsx';
import apiClient from '../api/ApiClient.js';

export default function VerifyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hospitals dynamically
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiClient.get('/hospital/hospitals'); // Adjust to your actual endpoint
        console.log(response.data.message); // Log the fetched data
        setHospitals(response.data.message || []); // Save the hospitals data in state
      } catch (error) {
        console.error('Failed to fetch hospitals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // Handle filtering by status (default to "pending")
  const handleFilterChange = async (status) => {
    setLoading(true);
    try {
      const response = await apiClient.get('/hospital/hospitals'); // Adjust to your actual endpoint
      const allHospitals = response.data.message || [];
      const filteredHospitals = (allHospitals).filter(hospital =>
        status ? hospital.isVerified === status : hospital.isVerified === 'Pending'
      );
      setHospitals(filteredHospitals);
    } catch (error) {
      console.error('Failed to filter hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading hospitals...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Searchbar onFilterChange={handleFilterChange} />
      <div className="bg-gray-50 flex flex-wrap justify-center gap-4 p-4">
        {hospitals.map(hospital => (
          <VerifyInfo key={hospital.id} {...hospital} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
