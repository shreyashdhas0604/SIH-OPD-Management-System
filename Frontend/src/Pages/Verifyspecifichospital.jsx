import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import hospitaldata from "../database.js";
import { toast } from "react-hot-toast";

export default function Verifyspecifichospital() {
  const { id } = useParams(); // Extract id from URL
  const [hospital, setHospital] = useState(null); // State to hold hospital data
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0); // Image index state
  const [isHovered, setIsHovered] = useState(false); // Hover state for images
  const [isDetailsHovered, setIsDetailsHovered] = useState(false); // Hover state for hospital details

  // Find the hospital data based on id
  useEffect(() => {
    const foundHospital = hospitaldata.find(
      (hospital) => hospital.id === parseInt(id) // Convert id to number
    );
    setHospital(foundHospital);
  }, [id]);

  // Update the hospital status in the hospitaldata array
  const updateHospitalStatus = (newStatus) => {
    const hospitalIndex = hospitaldata.findIndex((h) => h.id === parseInt(id));
    if (hospitalIndex !== -1) {
      hospitaldata[hospitalIndex].status = newStatus;
      setHospital({ ...hospitaldata[hospitalIndex] }); // Trigger re-render
    }
  };

  // Handle approval action
  const handleApprove = () => {
    updateHospitalStatus("approved");
    toast.success(`You have approved the hospital: ${hospital.name}`);
  };

  // Handle disapproval action
  const handleDisapprove = () => {
    updateHospitalStatus("disapproved");
    toast.error(`You have disapproved the hospital: ${hospital.name}`);
  };

  // Effect for sliding images during hover
  useEffect(() => {
    let intervalId;
    if (isHovered) {
      intervalId = setInterval(() => {
        setHoveredImageIndex((prevIndex) =>
          (prevIndex + 1) % hospital.url.length // Cycle through images
        );
      }, 2000); // Change image every 2 seconds
    }

    // Cleanup the interval on mouse leave or component unmount
    return () => clearInterval(intervalId);
  }, [isHovered, hospital]);

  if (!hospital) {
    return <div>Loading...</div>; // Display a loading message if hospital data is not yet loaded
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Hospital Image Gallery with Hover Effect */}
          <div
            className="relative mr-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={hospital.url[hoveredImageIndex]} // Image changes based on hoveredImageIndex
              alt={`Hospital Image ${hoveredImageIndex + 1}`}
              className="border-black w-full h-96 rounded-3xl shadow-2xl object-cover transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* Hospital Details */}
          <div
            className={`bg-blue-100 space-y-4 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-3000 transform hover:scale-105 hover:bg-blue-200`}
            onMouseEnter={() => setIsDetailsHovered(true)}
            onMouseLeave={() => setIsDetailsHovered(false)}
          >
            <h2
              className={`underline text-4xl font-bold transition-colors duration-300 ${
                isDetailsHovered ? "text-blue-500" : "text-gray-800"
              }`}
            >
              {hospital.name}
            </h2>
            <p className="text-lg text-gray-600">
              <strong>Specialty:</strong> {hospital.speciality}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Address:</strong> {hospital.address}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Contact:</strong> {hospital.contact}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Timings:</strong> {hospital.timings}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Status:</strong> {hospital.status} {/* Show hospital status */}
            </p>

            {/* Approve and Disapprove Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                className={`uppercase font-black px-4 py-2 ${
                  hospital.status === "approved"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-300 hover:bg-green-400"
                } text-black rounded-full transition-colors transform hover:scale-105`}
                onClick={handleApprove}
                disabled={hospital.status === "approved"} // Disable if already approved
              >
                Approve
              </button>
              <button
                className={`uppercase font-black px-4 py-2 ${
                  hospital.status === "disapproved"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-black rounded-full transition-colors transform hover:scale-105`}
                onClick={handleDisapprove}
                disabled={hospital.status === "disapproved"} // Disable if already disapproved
              >
                Disapprove
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
