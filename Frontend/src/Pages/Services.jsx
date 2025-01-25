import React from "react";

export default function Services() {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-teal-200 to-green-300 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-semibold text-black mb-4">OPD Consultation</h3>
            <p className="text-gray-700 mb-4">
              Get access to online and in-person OPD consultations with experienced doctors.
            </p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300">
              Learn More
            </button>
          </div>
          {/* Service Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-semibold text-black mb-4">Hospital Registration</h3>
            <p className="text-gray-700 mb-4">
              Register your hospital with us to get connected to patients seeking healthcare.
            </p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300">
              Learn More
            </button>
          </div>
          {/* Service Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-semibold text-black mb-4">Virtual OPD</h3>
            <p className="text-gray-700 mb-4">
              Join our virtual OPD rooms for real-time consultations with specialists.
            </p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
