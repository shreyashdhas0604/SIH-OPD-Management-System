import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import hospitaldata from "../database.js";
import { toast } from "react-hot-toast";

export default function Specifichospital() {
  const { id } = useParams(); // Extract id from URL
  const [hospital, setHospital] = useState(null); // State to hold hospital data
  const [selectedSlot, setSelectedSlot] = useState("");
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0); // Image index state
  const [isHovered, setIsHovered] = useState(false); // Hover state for images
  const [isDetailsHovered, setIsDetailsHovered] = useState(false); // Hover state for hospital details
  const [slotAvailability, setSlotAvailability] = useState([]); // Slot availability state

  // Find the hospital data based on id
  useEffect(() => {
    const foundHospital = hospitaldata.find(
      (hospital) => hospital.id === parseInt(id) // Convert id to number
    );
    setHospital(foundHospital);

    // Set initial slot availability
    if (foundHospital) {
      const availability = foundHospital.timeSlots.map(() =>
        Math.floor(Math.random() * foundHospital.totalPersonsPerSlot)
      );
      setSlotAvailability(availability); // Set availability only once on component mount
    }
  }, [id]);

  // Handle slot selection
  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Handle booking
  const handleBooking = (type) => {
    if (selectedSlot) {
      toast.success(`You have booked the ${type} for ${selectedSlot}`);
    } else {
      toast.error("Please select a time slot before booking.");
    }
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
            className={`bg-blue-100 space-y-4 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:bg-blue-200`}
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

            {/* Booking Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                className="px-4 py-2 bg-emerald-300 text-black rounded-full hover:bg-green-400 transition-colors transform hover:scale-105"
                onClick={() => handleBooking("Bed")}
              >
                Book Bed
              </button>
              <button
                className="px-4 py-2 bg-blue-300 text-black rounded-full hover:bg-blue-400 transition-colors transform hover:scale-105"
                onClick={() => handleBooking("OPD")}
              >
                Book OPD
              </button>
            </div>
          </div>
        </div>

        {/* Availability Section with checkboxes */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Slots Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {hospital.timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-xl transition-transform duration-300 ${
                  selectedSlot === slot
                    ? "bg-green-200"
                    : "bg-blue-100"
                } hover:bg-blue-200 hover:scale-105`}
                style={{ margin: '8px' }}
              >
                <label className="flex items-center justify-between">
                  <div>
                    <input
                      type="radio"
                      name="slot"
                      value={slot}
                      checked={selectedSlot === slot}
                      onChange={handleSlotChange}
                      className="mr-2"
                    />
                    <span className="text-lg font-medium">{slot}</span>
                  </div>
                </label>
                {/* Slot availability right-aligned */}
                <div className="text-right mt-2">
                  <p className="text-red-700 font-bold">
                    {slotAvailability[index]} left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
