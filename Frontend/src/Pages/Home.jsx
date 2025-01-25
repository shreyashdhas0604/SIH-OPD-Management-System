// import React from "react";
// import { Link } from "react-router-dom";
// import Header from "../Components/Header.jsx";
// import Footer from "../Components/Footer.jsx";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 text-white">
//       {/* Header */}
//       <Header />

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center py-20 text-center px-6">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
//           Welcome to OPD Management System
//         </h1>
//         <p className="text-lg md:text-xl mb-8">
//           Streamline healthcare with our modern platform.
//         </p>
//         <div className="flex space-x-4">
//           <Link
//             to="/book-opd"
//             className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
//           >
//             Book OPD
//           </Link>
//           <Link
//             to="/multi-hospital"
//             className="px-6 py-3 bg-white text-teal-600 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
//           >
//             Explore Hospitals
//           </Link>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white text-gray-700 text-center">
//         <h2 className="text-4xl font-bold mb-8">Our Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
//           {[
//             {
//               title: "Virtual OPD",
//               description: "Seamlessly connect with top doctors online.",
//               link: "/virtual-opd",
//             },
//             {
//               title: "Hospital Management",
//               description: "Manage hospital data effortlessly.",
//               link: "/hospitals",
//             },
//             {
//               title: "Secure Payments",
//               description: "Experience fast and safe transactions.",
//               link: "/features#payments",
//             },
//           ].map((feature, idx) => (
//             <Link
//               key={idx}
//               to={feature.link}
//               className="bg-teal-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-2xl font-bold mb-2 text-teal-600">
//                 {feature.title}
//               </h3>
//               <p>{feature.description}</p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;


// Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Toaster } from "react-hot-toast";
import apiClient from "../api/ApiClient"; // Assuming you have apiClient.js for API calls
import Footer from "../Components/Footer"; 
import Header from "../Components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [features, setFeatures] = useState([
    {
      "title": "Online OPD Registration",
      "description": "Register for outpatient department (OPD) visits online with ease. Choose your preferred doctor, hospital, and time slot for appointments.",
      "icon": "opd-registration-icon.png"
    },
    {
      "title": "Virtual OPD Consultations",
      "description": "Consult with doctors via video calls for a safe and convenient healthcare experience from home.",
      "icon": "virtual-opd-icon.png"
    },
    {
      "title": "Doctor Directory",
      "description": "Search for doctors based on specialty, location, ratings, and availability. Find the right doctor with detailed profiles.",
      "icon": "doctor-directory-icon.png"
    },
    {
      "title": "Multi-Hospital Exploration",
      "description": "Browse and explore multiple hospitals in the area, including details like specialties, ratings, and facilities.",
      "icon": "hospital-explore-icon.png"
    },
    {
      "title": "Appointment Reminders & Notifications",
      "description": "Get timely reminders for upcoming appointments and medical notifications to ensure you never miss a visit.",
      "icon": "appointment-reminder-icon.png"
    },
    {
      "title": "Digital Health Records",
      "description": "Securely store and access your medical records and prescriptions anytime, anywhere.",
      "icon": "digital-records-icon.png"
    },
    {
      "title": "Healthcare Chatbot Assistance",
      "description": "A virtual assistant to guide you through the registration process, help with appointment scheduling, and answer general queries.",
      "icon": "chatbot-assistant-icon.png"
    },
    {
      "title": "Health Tips & Articles",
      "description": "Access a library of health-related articles, tips, and news to stay informed on various health topics.",
      "icon": "health-tips-icon.png"
    },
    {
      "title": "Insurance & Payment Integration",
      "description": "Integrate your health insurance information and process payments for consultations, treatments, and hospital visits.",
      "icon": "payment-integration-icon.png"
    },
    {
      "title": "Personalized Health Dashboard",
      "description": "Track your health journey with personalized analytics, including appointment history, upcoming visits, and test results.",
      "icon": "health-dashboard-icon.png"
    },
    {
      "title": "Doctor & Hospital Ratings and Reviews",
      "description": "Rate your doctors and hospitals and read reviews from other patients to help make informed decisions.",
      "icon": "ratings-reviews-icon.png"
    },
    {
      "title": "Real-Time Wait Time Updates",
      "description": "Get real-time updates on wait times for consultations and procedures at hospitals.",
      "icon": "wait-time-icon.png"
    }
  ]
  );
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Fetch data from backend using apiClient
    const fetchData = async () => {
      try {
        // const [featuresData, appointmentsData, doctorsData, hospitalsData] = await Promise.all([
        //   // apiClient.get('/features'),
        //   apiClient.get('/user/me'),
        //   // apiClient.get('/doctors'),
        //   // apiClient.get('/hospitals')
        // ]);
        const appointments1 = await apiClient.get('/user/me');
        const doctors1 = await apiClient.get('/doctor/getAllDoctors');
        const allusers = await apiClient.get('/user/getAllUsers');
        // setFeatures(featuresData.data);
        setAppointments(appointments1.data.data.registrations || appointments1.data.data.doctorInfo.registrations);
        const arr = (doctors1.data).concat(allusers.data.data);
        setDoctors(arr);
        // setHospitals(hospitalsData.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const fetchMoreData = () => {
    if (appointments.length >= 30) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setAppointments(appointments.concat(Array.from({ length: 6 })));
    }, 1500);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 text-white">
        {/* Navbar */}
        <Header />

        {/* Hero Section */}
          <Parallax className="hero-section" speed={-10}>
            <section className="flex flex-col items-center justify-center py-20 text-center px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg">
                Seamless Healthcare Management at Your Fingertips!
              </h1>
              <p className="text-base md:text-lg lg:text-xl mb-8">
                Managing your health has never been this easy and efficient.
              </p>
              <div className="flex flex-wrap justify-center space-x-4">
                <Link
            to="/book-opd"
            className="px-4 py-2 md:px-6 md:py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 mb-4 md:mb-0"
                >
            Register for OPD
                </Link>
                <Link
            to="/join-vopd"
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-teal-600 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 mb-4 md:mb-0"
                >
            Join Virtual OPD
                </Link>
                <Link
            to="/multi-hospital"
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-teal-600 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 mb-4 md:mb-0"
                >
            Explore Hospitals 
                </Link>
                <Link
            to="/all-doctors"
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-teal-600 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
                >
            Explore Doctors 
                </Link>
                <Link
            to="/hospital/register"
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-teal-600 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
                >
            Register Hospital 
                </Link>
              </div>
            </section>
          </Parallax>

          {/* Key Features Section */}
        <section className="py-16 bg-white text-gray-700">
          <h2 className="text-4xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-teal-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              {appointments.map((appointment, index) => (
                <div key={index} className="bg-teal-700 p-6 rounded-lg shadow-md mb-4">
                  <h3 className="text-2xl text-center font-bold mb-2">{new Date(appointment.date).toLocaleDateString()}</h3>
                  <p>Doctor :  {appointment.doctor.user.username}</p>
                  <p>Hospital : {appointment.hospital.name}</p>
                  <p>Time : {appointment.OPDTime}</p>
                  <p>OPDType : {(appointment.isVirtualOPD) ? ("Virtual") : ("In Hospital")}</p>
                  <a href="/user-profile1"> see more details...</a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No upcoming appointments</p>
          )}
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white text-gray-700">
          <h2 className="text-4xl font-bold mb-8 text-center">What Our Users Say</h2>
          <Slider {...sliderSettings} className="max-w-6xl mx-auto">
            {doctors.map((doctor, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{doctor?.user?.username || doctor?.username}</h3>
                <p className="italic">{(doctor?.user?.testimonial) ? (doctor.user.testimonial) : ("Excellent Application loving to use !!") }</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-6xl mx-auto">
            <div className="p-6 bg-teal-700 rounded-lg mb-4">
              <h3 className="text-2xl font-bold mb-2">How to register for OPD?</h3>
              <p>To register for OPD, simply click on "Register for OPD" and fill in the required details.</p>
            </div>
            <div className="p-6 bg-teal-700 rounded-lg mb-4">
              <h3 className="text-2xl font-bold mb-2">How does Virtual OPD work?</h3>
              <p>Join Virtual OPD from anywhere. You will be connected with a doctor via video consultation.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </ParallaxProvider>
  );
};

export default Home;

