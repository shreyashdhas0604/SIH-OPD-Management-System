import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [patientData, setPatientData] = useState({});
  const [hospitalData, setHospitalData] = useState({});
  const [doctorData, setDoctorData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(true);
  const [opdData, setOpdData] = useState({});
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [showHospitalDetails, setShowHospitalDetails] = useState(false); // State for hospital details modal
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const {
      patientData: initialPatientData,
      hospitalData: initialHospitalData,
      doctorData: initialDoctorData,
      paymentStatus: initialPaymentStatus,
      opdData: initialOpdData,
    } = location.state || {};

    if (initialPatientData && initialHospitalData && initialDoctorData && initialOpdData) {
      setPatientData(initialPatientData);
      setHospitalData(initialHospitalData);
      setDoctorData(initialDoctorData);
      setOpdData(initialOpdData);
      setPaymentStatus(initialPaymentStatus || "Pending");
      setIsLoading(false);
    } else {
      toast.error("Missing data. Redirecting to home...");
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % hospitalData.hospitalImageUrl.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [hospitalData.hospitalImageUrl]);

  const handlePayment = () => {
    setPaymentStatus("Paid");
    toast.success("Payment Successful!");
    navigate("/make-payment", { state: { patientData, hospitalData, doctorData, opdData ,paymentStatus : "Pending"} });
  };

  const togglePatientDetails = () => {
    setShowPatientDetails((prev) => !prev);
  };

  const toggleDoctorDetails = () => {
    setShowDoctorDetails((prev) => !prev);
  };

  const toggleHospitalDetails = () => {
    setShowHospitalDetails((prev) => !prev);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-6">
      <div className="container mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-white text-center mb-6">OPD Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hospital Section */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300 h-96"
            onClick={toggleHospitalDetails}
          >
            <img
              src={hospitalData.hospitalImageUrl[imageIndex]}
              alt="Hospital"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{hospitalData.name}</h2>
            <p className="text-gray-600">{hospitalData.speciality}</p>
            <p className="text-gray-600">Established: {new Date(hospitalData.establishedDate).getFullYear()}</p>
          </div>

          {/* Doctor Section */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300 h-96"
            onClick={toggleDoctorDetails}
          >
            <img
              src={doctorData.user?.avatar || "/default-doctor.png"}
              alt="Doctor"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{doctorData.user?.username}</h2>
            <p className="text-gray-600">{doctorData.specialization}</p>
            <p className="text-gray-600">Experience: {doctorData.experience} years</p>
          </div>

          {/* Patient Section */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300 h-96"
            onClick={togglePatientDetails}
          >
            <img
              src={patientData.avatar || "/default-patient.png"}
              alt="Patient"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{patientData.username}</h2>
            <p className="text-gray-600">Gender: {patientData.gender}</p>
            <p className="text-gray-600">Contact: {patientData.contactNumber}</p>
          </div>
        </div>

{/* OPD Details Section */}
<div className="bg-white rounded-lg shadow-xl p-6 text-center">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">OPD Details</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg text-gray-600">
    <div>
      <p><strong>Name:</strong> {opdData.name}</p>
    </div>
    <div>
      <p><strong>Age:</strong> {opdData.age}</p>
    </div>
    <div>
      <p><strong>Gender:</strong> {opdData.gender}</p>
    </div>
    <div>
      <p><strong>Blood Group:</strong> {opdData.bloodGroup}</p>
    </div>
    <div>
      <p><strong>Symptoms:</strong> {opdData.symptoms}</p>
    </div>
    <div>
      <p><strong>Weight:</strong> {opdData.weight}</p>
    </div>
    <div>
      <p><strong>Allergies:</strong> {opdData.allergies}</p>
    </div>
    <div>
      <p><strong>Permanent Illness:</strong> {opdData.permanentIllness}</p>
    </div>
    <div>
      <p><strong>Disability Status:</strong> {opdData.disabilityStatus}</p>
    </div>
    <div>
      <p><strong>Insurance Card:</strong> {opdData.insuranceCard}</p>
    </div>
    <div>
      <p><strong>Ration Card:</strong> {opdData.rationCard}</p>
    </div>
    <div>
      <p><strong>Follow Up:</strong> {opdData.followUp ? "Yes" : "No"}</p>
    </div>
    <div>
      <p><strong>Follow Up Date:</strong> {opdData.followUpDate ? new Date(opdData.followUpDate).toLocaleDateString() : "N/A"}</p>
    </div>
    <div>
      <p><strong>Follow Up Diagnosis:</strong> {opdData.followUpDiagnosis}</p>
    </div>
    <div>
      <p><strong>Follow Up Prescription:</strong> {opdData.followUpPrescription}</p>
    </div>
    <div>
      <p><strong>Follow Up Reason:</strong> {opdData.followUpReason}</p>
    </div>
  </div>
</div>


        {/* Payment Status */}
        <div className="bg-white rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Payment Status</h2>
          <p className="text-lg text-gray-600">{paymentStatus}</p>
          {paymentStatus !== "Paid" && (
            <button
              onClick={handlePayment}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg text-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>

      

      {/* Patient Details Modal */}
      {showPatientDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={togglePatientDetails}
        >
          <div
            className="bg-[#F2F2F7] text-[#333333] rounded-lg shadow-2xl w-3/4 md:w-1/2 p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={togglePatientDetails}
              className="absolute top-4 right-4 text-white text-2xl font-extrabold"
            >
              ×
            </button>
            <h2 className="text-4xl font-bold text-center mb-4">Patient Details</h2>
            <div className="flex justify-center mb-6">
              <img
                src={patientData.avatar || "/default-patient.png"}
                alt="Patient"
                className="w-64 h-64 object-cover rounded-full border-4 border-gray-800"
              />
            </div>
            <div className="space-y-4 text-xl">
              <p><strong>Name:</strong> {patientData.username}</p>
              <p><strong>Age:</strong> {patientData.age || "N/A"}</p>
              <p><strong>Gender:</strong> {patientData.gender}</p>
              <p><strong>Contact:</strong> {patientData.contactNumber}</p>
              <p><strong>Address:</strong> {patientData.address || "N/A"}</p>
              <p><strong>Insurance Card:</strong> {patientData.insuranceCard || "N/A"}</p>
              <p><strong>Ration Card:</strong> {patientData.rationCard || "N/A"}</p>
              <p><strong>Permanent Illness:</strong> {patientData.permanentIllness || "N/A"}</p>
              <p><strong>Disability Status:</strong> {patientData.disabilityStatus || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Details Modal */}
      {showDoctorDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleDoctorDetails}
        >
          <div
            className="bg-[#F2F2F7] text-[#333333] rounded-lg shadow-2xl w-3/4 md:w-1/2 p-6 relative overflow-hidden max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleDoctorDetails}
              className="absolute top-4 right-4 text-white text-2xl font-extrabold"
            >
              ×
            </button>
            <h2 className="text-4xl font-bold text-center mb-4">Doctor Details</h2>
            <div className="flex justify-center mb-6">
              <img
                src={doctorData.user?.avatar || "/default-doctor.png"}
                alt="Doctor"
                className="w-64 h-64 object-cover rounded-full border-4 border-gray-800"
              />
            </div>
            <div className="space-y-4 text-xl">
              <p><strong>Name:</strong> {doctorData.user?.username}</p>
              <p><strong>Specialization:</strong> {doctorData.specialization}</p>
              <p><strong>Qualification:</strong> {doctorData.qualification}</p>
              <p><strong>Experience:</strong> {doctorData.experience} years</p>
              <p><strong>Department:</strong> {doctorData.department?.name || "N/A"}</p>
              <p><strong>Rating:</strong> {doctorData.ratings?.length > 0 ? doctorData.ratings[0].rating : "N/A"} / 5</p>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Details Modal */}
      {showHospitalDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleHospitalDetails}
        >
          <div
            className="bg-[#F2F2F7] text-[#333333] rounded-lg shadow-2xl w-3/4 md:w-1/2 p-6 relative overflow-hidden max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleHospitalDetails}
              className="absolute top-4 right-4 text-white text-2xl font-extrabold"
            >
              ×
            </button>
            <h2 className="text-4xl font-bold text-center mb-4">Hospital Details</h2>
            <div className="flex justify-center mb-6">
              <img
                src={hospitalData.hospitalImageUrl[imageIndex]}
                alt="Hospital"
                className="w-1/2 h-64 object-cover rounded-2xl border-4 border-gray-800"
              />
            </div>
            <div className="space-y-4 text-xl">
              <p><strong>Name:</strong> {hospitalData.name}</p>
              <p><strong>Speciality:</strong> {hospitalData.speciality}</p>
              <p><strong>Address:</strong> {hospitalData.address}</p>
              <p><strong>Established:</strong> {new Date(hospitalData.establishedDate).getFullYear()}</p>
              <p><strong>Contact:</strong> {hospitalData.contactNumber}</p>
              <p><strong>Rating:</strong> {hospitalData.rating}</p>
              <p><strong>Registration Number:</strong> {hospitalData.registrationNumber}</p>
              <p><strong>Timings:</strong> {hospitalData.timings}</p>
              <p><strong>Total Beds:</strong> {hospitalData.totalBeds}</p>
              <p><strong>Persons per Slot:</strong> {hospitalData.totalPersonsPerSlot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
