import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { toast } from "react-hot-toast";
import apiClient from "../api/ApiClient.js";

export default function Verifyspecifichospital() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await apiClient.get(`/hospital/hospital/${id}`);
        console.log("In VerifySpecificHospital.jsx response.data:", response.data);
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        toast.error("Failed to load hospital data.");
      }
    };
    fetchHospital();
  }, [id]);

  const updateHospitalStatus = async (newStatus) => {
    try {
      const updatedHospital = { ...hospital, isVerified: newStatus };
      const response = await apiClient.put(`/hospital/update-hospital/${id}`, updatedHospital);
      console.log("In VerifySpecificHospital.jsx response.data:", response.data);
      setHospital(updatedHospital);
      toast.success(`Hospital status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating hospital status:", error);
      toast.error("Failed to update hospital status.");
    }
  };

  const handleApprove = () => updateHospitalStatus("Approved");
  const handleDisapprove = () => updateHospitalStatus("Disapproved");
  const handlePending = () => updateHospitalStatus("Pending");

  useEffect(() => {
    let intervalId;
    if (isHovered && hospital?.hospitalImageUrl?.length) {
      intervalId = setInterval(() => {
        setHoveredImageIndex((prevIndex) => (prevIndex + 1) % hospital.hospitalImageUrl.length);
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, hospital]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={hospital.hospitalImageUrl[hoveredImageIndex]}
              alt={`Hospital Image ${hoveredImageIndex + 1}`}
              className="border-black w-full h-96 rounded-3xl shadow-2xl object-cover"
            />
          </div>

          <div className="bg-blue-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
            <h2 className="underline text-4xl font-bold text-gray-800">
              {hospital.name}
            </h2>
            <p className="text-lg text-gray-600">
              <strong>Specialty:</strong> {hospital.speciality}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Address:</strong> {hospital.address}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Contact:</strong> {hospital.contactNumber}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Timings:</strong> {hospital.timings}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Status:</strong> {hospital.isVerified}
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                className={`uppercase font-bold px-4 py-2 ${
                  hospital.isVerified === "Approved"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                } text-white rounded-full`}
                onClick={handleApprove}
                disabled={hospital.isVerified === "Approved"}
              >
                Approve
              </button>
              <button
                className={`uppercase font-bold px-4 py-2 ${
                  hospital.isVerified === "Disapproved"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white rounded-full`}
                onClick={handleDisapprove}
                disabled={hospital.isVerified === "Disapproved"}
              >
                Disapprove
              </button>
              <button
                className={`uppercase font-bold px-4 py-2 ${
                  hospital.isVerified === "Pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-full`}
                onClick={handlePending}
                disabled={hospital.isVerified === "Pending"}
              >
                Pending
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
