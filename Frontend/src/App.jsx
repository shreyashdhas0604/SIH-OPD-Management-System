import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Multihospital from "./Pages/Multihospital";
import Specifichospital from "./Pages/Specifichospital";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Verifyhospitals from "./Pages/Verifyhospitals";
import Verifyspecifichospital from "./Pages/Verifyspecifichospital";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout";
import BookOPDPage from "./Pages/BookOPDPage";
// import Payment from "./Pages/payment";
import PaymentForm from "./Pages/PaymentForm";
import JoinRoom from "./Pages/join";
import Video from "./Pages/meeting";
import HospitalRegistrationForm from "./Pages/HospitalRegistrationForm";
import ForgotPassword from "./Pages/ForgotPassword";
import UserProfile from "./Pages/UserProfile";
import AllDoctorsPage from "./Pages/AllDoctorsPage";
import Services from "./Pages/Services";
// import AboutUs from "./Pages/Aboutus";

function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multi-hospital" element={<Multihospital />} />      // Done                
          <Route path="/specific-hospital/:id" element={<Specifichospital />} />   // Done       
          <Route path="/verify-hospital" element={<Verifyhospitals />} />             // Done
          <Route path="/verify-specific-hospital/:id" element={<Verifyspecifichospital />} />       //Done
          <Route path="/login" element={<Login />} />                                     // Done          
          <Route path="/register" element={<Register />} />                               // Done 
          <Route path="/logout" element={<Logout />} />                             // Done
          <Route path="/book-opd" element={<BookOPDPage />} />                      // Done
          {/* <Route path='/payment' element={<Payment />} /> */}
          <Route path="/make-payment" element={<PaymentForm/>} />
          <Route path="/join-vopd" element={<JoinRoom />} />                          // Done
          <Route path="/video/:id" element={<Video/>} />                           // Done  
          <Route path="/hospital/register" element={<HospitalRegistrationForm/>} />       // Done
          <Route path="/forgot-password" element={<ForgotPassword />} />                // Done
          <Route path="/user-profile1" element={<UserProfile />} />       //Done
          <Route path="/all-doctors" element={<AllDoctorsPage />} />       //Done
          <Route path="/services" element={<Services />} />      
          {/* <Route path="/about-us" element={<AboutUs />} />       */}

        </Routes>
      </BrowserRouter>

      {/* Add the Toaster here to enable toast notifications */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;