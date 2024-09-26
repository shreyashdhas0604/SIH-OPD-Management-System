import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Multihospital from "./Pages/Multihospital";
import Specifichospital from "./Pages/Specifichospital";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Verifyhospitals from "./Pages/Verifyhospitals";
import Verifyspecifichospital from "./Pages/Verifyspecifichospital";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multi-hospital" element={<Multihospital />} />
          <Route path="/specific-hospital/:id" element={<Specifichospital />} />
          <Route path="/verify-hospital" element={<Verifyhospitals />} />
          <Route path="/verify-specific-hospital/:id" element={<Verifyspecifichospital />} />
        </Routes>
      </BrowserRouter>

      {/* Add the Toaster here to enable toast notifications */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;