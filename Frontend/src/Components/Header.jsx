import OPD_logo from "../assets/Images/OPD_logo.jpg";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Hamburger icon

export default function Header() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
  const location = useLocation();

  useEffect(() => {
    // Check if the current page is the Home page
    setIsHomePage(location.pathname === "/");
  }, [location]);

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-emerald-200 shadow-xl opacity-100 relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <h1 className="font-bold text-sm sm:text-xl flex items-center space-x-2">
          <img src={OPD_logo} className="h-7 w-7 rounded-lg" alt="OPD Logo" />
          <span className="text-black">MedQueue</span>
        </h1>

        {/* Hamburger icon for mobile view */}
        <button
          className="sm:hidden text-2xl text-black focus:outline-none"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>

        {/* Dropdown Menu */}
        <nav
          className={`absolute top-full left-0 w-full bg-transparent z-50 sm:static sm:w-auto sm:bg-transparent sm:flex sm:items-center sm:space-x-6 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden sm:block"
          }`}
        >
          <ul className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-0 bg-transparent sm:bg-transparent sm:relative sm:top-auto">
            <li>
              <a
                href="/"
                className="text-black hover:underline py-2 sm:py-0"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about-us"
                className="text-black hover:underline py-2 sm:py-0"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-black hover:underline py-2 sm:py-0"
              >
                Services
              </a>
            </li>
            {isHomePage && (
              <>
                <li>
                  <a
                    href="/login"
                    className="text-black hover:underline py-2 sm:py-0"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="text-black hover:underline py-2 sm:py-0"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
