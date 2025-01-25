import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { toast } from "react-hot-toast";
import apiClient from "../api/ApiClient.js";

export default function Specifichospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await apiClient.get(`/hospital/hospital/${id}`);
        setHospital(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        toast.error("Failed to load hospital data.");
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [id]);

  // Fetch time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;
    const fetchTimeSlots = async () => {
      try {
        const response = await apiClient.get(`/hospital/available-timeslots/${id}/${selectedDate}`);
        const filteredSlots = response.data.availableTimeSlots.data.filter(
          (slot) =>
            slot.availableCount > 0
        );
        setTimeSlots(filteredSlots);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        toast.error("Failed to load time slots.");
      }
    };

    fetchTimeSlots();
  }, [id, selectedDate]);

  const handleBookAppointment = () => {
    if (!selectedDate || selectedTimeSlot === null) {
      toast.error("Please select a date and time slot!");
      return;
    }
    navigate("/book-opd", {
      state: { hospital, selectedDate, selectedTimeSlot },
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!hospital) {
    return <div className="flex items-center justify-center h-screen">Hospital not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hospital Image Gallery */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={hospital.hospitalImageUrl[hoveredImageIndex]}
              alt={`Hospital Image ${hoveredImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <div className="flex mt-4 justify-center space-x-2">
              {hospital.hospitalImageUrl.map((_, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    hoveredImageIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-blue-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Hospital Details with more information */}
          <div className="bg-gradient-to-r from-indigo-100 via-blue-200 to-green-200 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{hospital.name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Specialty:</strong> {hospital.speciality}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Address:</strong> {hospital.address}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Contact:</strong> {hospital.contactNumber}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Timings:</strong> {hospital.timings}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Established:</strong> {new Date(hospital.establishedDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Rating:</strong> {hospital.rating} / 5
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Beds Available:</strong> {hospital.totalBeds - (hospital.totalPersonsPerSlot * timeSlots.length)}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Registration Number:</strong> {hospital.registrationNumber}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong> {hospital.isVerified === "approved" ? "Verified" : "Not Verified"}
            </p>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />

        <h3 className="text-2xl font-semibold text-blue-800 mt-6 mb-4">
          Available Time Slots
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-lg cursor-pointer ${
                  selectedTimeSlot === index
                    ? "ring-2 ring-blue-500"
                    : "hover:bg-blue-300"
                }`}
                onClick={() => setSelectedTimeSlot(index)}
              >
                <p className="text-lg font-medium text-blue-900">{slot.time}</p>
                <p className="text-sm text-gray-700">Available: {slot.availableCount}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No time slots available for the selected date.</p>
          )}
        </div>

        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBookAppointment}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Book OPD
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
