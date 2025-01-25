import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-teal-200 to-green-300 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-black mb-8">About Us</h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            MedQueue is an innovative healthcare platform designed to connect patients with doctors for
            seamless and efficient healthcare delivery. Our mission is to provide easy access to medical
            services, including OPD consultations, hospital registration, and virtual consultations.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in the power of technology to make healthcare more accessible, convenient, and
            affordable for everyone. With our user-friendly platform, you can book consultations, manage
            appointments, and access medical services from the comfort of your home.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team is composed of experienced healthcare professionals, developers, and support staff,
            all working together to bring the best healthcare experience to our users.
          </p>
        </div>
      </div>
    </div>
  );
}
