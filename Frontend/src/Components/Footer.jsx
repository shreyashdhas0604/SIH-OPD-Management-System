import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone, FaQuestionCircle, FaMapMarkerAlt, FaUser } from "react-icons/fa"; // Import all necessary icons

const Footer = () => {
  return (
    <footer className="bg-emerald-200 text-gray-800 py-6 px-4 mt-auto w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start text-sm">
        {/* Left Section: Help Details, Contact Us, Address */}
        <div className="flex flex-col md:flex-row md:space-x-6 md:items-start mb-4">
          {/* Help & Support Section */}
          <div className="flex flex-col mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <FaQuestionCircle className="mr-2 text-lg" />
              <h2 className="text-md font-semibold">Help & Support</h2>
            </div>
            <p className="ml-6">
              For any assistance, please contact our support team at nic@gmail.com or call us at +91 12345 67890.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <FaUser className="mr-2 text-lg" />
              <h2 className="text-md font-semibold">Contact Us</h2>
            </div>
            <p className="flex items-center ml-6">
              <FaEnvelope className="mr-2 text-lg" /> nic@gmail.com
            </p>
            <p className="flex items-center ml-6">
              <FaPhone className="mr-2 text-lg" /> +91 12345 67890
            </p>
          </div>

          {/* Address Section */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-lg" />
              <h2 className="text-md font-semibold">Address</h2>
            </div>
            <p className="ml-6">National Informatic centre,<br/> Pune-411001,<br/>India</p>
          </div>
        </div>

        {/* Right Section: Social Media Links and Approval Details */}
        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0">
          {/* Follow Us */}
          <div className="flex flex-col md:mr-6 mb-4 md:mb-0">
            <h2 className="text-md font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-5 w-5 text-gray-800 hover:text-blue-500" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-5 w-5 text-gray-800 hover:text-pink-500" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-5 w-5 text-gray-800 hover:text-blue-700" />
              </a>
            </div>
          </div>

          {/* Approval Details */}
          <div className="text-xs text-gray-600 md:ml-6 ">
            Approved by the Ministry of Health
            <br />
            &copy; {new Date().getFullYear()} MedQueue. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
