import React, { useState, useEffect } from "react";
import apiClient from "../api/ApiClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hoursToMilliseconds, set } from "date-fns";
import VirtualOPD from "../Components/VirtualOPD";
import { useLocation } from "react-router-dom";
import { time } from "framer-motion";
import { form } from "framer-motion/client";


const BookOPDPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const navigate = useNavigate();
  //filling opdData with initial values completely
  
  const [formData, setFormData] = useState({
    patientName: "",
    contactNumber: "",
    hospital: "",
    doctor: "",
    department: "",
    bed: "",
    date: new Date(),
    symptoms: "",
    age: "",
    gender: "",
    address: "",
    insuranceCard: "",
    rationCard: "",
    permanentIllness: "",
    disabilityStatus: "",
    followUp: false,
    followUpDate: null,
    followUpReason: "",
    followUpPrescription: "",
    followUpDiagnosis: "",
    allergies: "",
    bloodGroup: "",
    weight: "",
    isVirtualOPD: false, // New field for virtual OPD
    OPDTime: "",
  });
  const location = useLocation();
  const { hospital, selectedDate, selectedTimeSlot } = location.state || {};
  
  useEffect(() => {
    if (hospital) {
      console.log("selected timeslot : ", selectedTimeSlot);
      setFormData((prevFormData) => ({
        ...prevFormData,
        hospital: hospital.id,
        date: selectedDate || new Date(),
        OPDTime: selectedTimeSlot || "",
      }));
    }
  }, [hospital, selectedDate, selectedTimeSlot]);
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiClient.get("/hospital/hospitals");
        setHospitals(response.data.message || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get("/doctor/getAllDoctors");
        setDoctors(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchPatientData = async () => {
      try {
        const response = await apiClient.get("/user/me");
        setPatientData(response.data.data);
        console.log("Patient Data:", response.data.data); // Log patient data here
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchHospitalData = async () => {
      try {
        const response = await apiClient.get(
          `/hospital/hospital/${formData.hospital}`
        );
        setHospitalData(response.data);
        console.log("Hospital Data:", response.data); // Log hospital data here
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    const fetchDoctorData = async () => {
      try {
        const response = await apiClient.get(
          `/doctor/getDoctor/${formData.doctor}`
        );
        setDoctorData(response.data);
        console.log("Doctor Data:", response.data); // Log doctor data here
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    const fetchTimeSlots = async () => {
      try {
        const response = await apiClient.get(
          `hospital/available-timeslots/${formData.hospital}/${formData.date}`
        );
        setTimeSlots(response.data.availableTimeSlots.data || []); // Fixed here
        console.log("Time Slots:", response.data.availableTimeSlots.data); // Log time slots here
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };
    


    // Only fetch patient, hospital, and doctor data when hospitalID and doctorID are set
    if (formData.hospital | formData.doctor) {
      fetchPatientData();
      fetchHospitalData();
      fetchDoctorData();
      fetchTimeSlots();
    }

    fetchHospitals();
    fetchDoctors();
  }, [formData.hospital, formData.doctor]); // Correct the dependency array

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName)
      newErrors.patientName = "Patient name is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.hospital)
      newErrors.hospital = "Hospital selection is required";
    if (!formData.doctor) newErrors.doctor = "Doctor selection is required";
    if (!formData.symptoms) newErrors.symptoms = "Symptoms are required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleProceed = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Validate the form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const patientID = JSON.parse(localStorage.getItem("user"));
  
    // Construct OPD data
    const opdData = {
      name: formData.patientName,
      patientID: parseInt(patientID?.id),
      doctorID: parseInt(formData.doctor),
      hospitalID: parseInt(formData.hospital),
      departmentID: formData.department || null,
      bedID: formData.bed || null,
      date: formData.date,
      symptoms: formData.symptoms || "N/A",
      age: formData.age ? parseInt(formData.age) : null,
      gender: formData.gender || null,
      address: formData.address || "N/A",
      insuranceCard: formData.insuranceCard || "N/A",
      rationCard: formData.rationCard || "N/A",
      permanentIllness: formData.permanentIllness || "N/A",
      disabilityStatus: formData.disabilityStatus || "N/A",
      followUp: formData.followUp,
      followUpDate: formData.followUp ? formData.followUpDate : null,
      followUpReason: formData.followUp ? formData.followUpReason : "N/A",
      followUpPrescription: formData.followUp ? formData.followUpPrescription : "N/A",
      followUpDiagnosis: formData.followUp ? formData.followUpDiagnosis : "N/A",
      allergies: formData.allergies || "N/A",
      bloodGroup: formData.bloodGroup || "N/A",
      weight: formData.weight ? parseFloat(formData.weight) : null,
      OPDTime: formData.OPDTime || timeSlots[selectedTimeSlot].time,
      isVirtualOPD: formData.isVirtualOPD,
      VirtualOPDLink: null,
      VirtualOPDRoomName: null,
    };

    
  
    try {
      // Submit OPD registration data
        console.log("selected TimeSlot : ",selectedTimeSlot);
        console.log("timeslots : ",timeSlots);

    const timeslotIndex = timeSlots.findIndex(slot => slot.time === formData.OPDTime);

    const originalDate = new Date(formData.date);

// Reset time to midnight
      const updatedDate = new Date(Date.UTC(
        originalDate.getUTCFullYear(),
        originalDate.getUTCMonth(),
        originalDate.getUTCDate()
      ));
      const payload = {
        uniqueIdentifier : `${formData.date}-${formData.OPDTime}-${formData.hospital}`,
        hospitalID: formData.hospital,
        time: timeSlots[selectedTimeSlot]?.time || formData.OPDTime,
        date: updatedDate.toISOString(),
        availableCount: timeSlots[timeslotIndex].availableCount - 1,
      }
  
      const updateSlot = await apiClient.post(`/hospital/${formData.hospital}/timeslots`, payload);
      console.log("Timeslot updated:", updateSlot.data);


      let response;
      if (formData.isVirtualOPD) {
        response = await apiClient.post("/opd/schedulemeet", opdData);
        console.log("Virtual Meeting booked:", response.data);
      } else {
        response = await apiClient.post("/opd/register", opdData);
        console.log("OPD booked:", response.data);
      }
  
      // Proceed to the next page after successful submission
    // Replace with actual doctor data if available
    if (patientData?.id && hospitalData?.id && doctorData?.id && opdData?.name) {
      navigate("/payment", {
        state: {
          patientData,
          hospitalData,
          doctorData,
          opdData,
          paymentStatus: "Pending",
        },
      });

    }
    toast.success("OPD booked successfully!");
    } catch (error) {
      console.error("Error booking OPD:", error);
      toast.error("Failed to book OPD. Please try again.");
    }
  };
  

  // const handleProceed = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   const patientID = JSON.parse(localStorage.getItem("user"));

  //   const opdData = {
  //     name: formData.patientName,
  //     patientID: parseInt(patientID?.id),
  //     doctorID: parseInt(formData.doctor),
  //     hospitalID: parseInt(formData.hospital),
  //     departmentID: formData.department || null,
  //     bedID: formData.bed || null,
  //     date: formData.date,
  //     symptoms: formData.symptoms || "N/A",
  //     age: formData.age ? parseInt(formData.age) : null,
  //     gender: formData.gender || null,
  //     address: formData.address || "N/A",
  //     insuranceCard: formData.insuranceCard || "N/A",
  //     rationCard: formData.rationCard || "N/A",
  //     permanentIllness: formData.permanentIllness || "N/A",
  //     disabilityStatus: formData.disabilityStatus || "N/A",
  //     followUp: formData.followUp,
  //     followUpDate: formData.followUp ? formData.followUpDate : null,
  //     followUpReason: formData.followUp ? formData.followUpReason : "N/A",
  //     followUpPrescription: formData.followUp
  //       ? formData.followUpPrescription
  //       : "N/A",
  //     followUpDiagnosis: formData.followUp ? formData.followUpDiagnosis : "N/A",
  //     allergies: formData.allergies || "N/A",
  //     bloodGroup: formData.bloodGroup || "N/A",
  //     weight: formData.weight ? parseFloat(formData.weight) : null,
  //     isVirtualOPD: formData.isVirtualOPD, // New field for virtual OPD
  //     OPDTime: formData.OPDTime || null,
  //   };

  //   if (
  //     patientData?.id &&
  //     hospitalData?.id &&
  //     doctorData?.id &&
  //     opdData?.name
  //   ) {
  //     navigate("/payment", {
  //       state: {
  //         patientData,
  //         hospitalData,
  //         doctorData,
  //         opdData,
  //         paymentStatus: "Pending",
  //       },
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const patientID = JSON.parse(localStorage.getItem("user"));

    const opdData = {
      name: formData.patientName,
      patientID: parseInt(patientID?.id),
      doctorID: parseInt(formData.doctor),
      hospitalID: parseInt(formData.hospital),
      departmentID: formData.department || null,
      bedID: formData.bed || null,
      date: formData.date,
      symptoms: formData.symptoms || "N/A",
      age: formData.age ? parseInt(formData.age) : null,
      gender: formData.gender || null,
      address: formData.address || "N/A",
      insuranceCard: formData.insuranceCard || "N/A",
      rationCard: formData.rationCard || "N/A",
      permanentIllness: formData.permanentIllness || "N/A",
      disabilityStatus: formData.disabilityStatus || "N/A",
      followUp: formData.followUp,
      followUpDate: formData.followUp ? formData.followUpDate : null,
      followUpReason: formData.followUp ? formData.followUpReason : "N/A",
      followUpPrescription: formData.followUp
        ? formData.followUpPrescription
        : "N/A",
      followUpDiagnosis: formData.followUp ? formData.followUpDiagnosis : "N/A",
      allergies: formData.allergies || "N/A",
      bloodGroup: formData.bloodGroup || "N/A",
      weight: formData.weight ? parseFloat(formData.weight) : null,
      OPDTime: timeSlots[selectedTimeSlot].time || formData.OPDTime,
      isVirtualOPD: formData.isVirtualOPD,
      VirtualOPDLink: null,
      VirtualOPDRoomName : null,
    };

    const timeslotIndex = timeSlots.findIndex(slot => slot.time === formData.OPDTime);

    // const payload = {
    //   uniqueIdentifier : `${formData.date}-${formData.OPDTime}-${formData.hospital}`,
    //   hospitalID: formData.hospital,
    //   time: timeSlots[selectedTimeSlot].time,
    //   date: formData.date,
    //   availableCount: timeSlots[timeslotIndex].availableCount - 1,
    // }
    const originalDate = new Date(formData.date);

// Reset time to midnight
      const updatedDate = new Date(Date.UTC(
        originalDate.getUTCFullYear(),
        originalDate.getUTCMonth(),
        originalDate.getUTCDate()
      ));
      const payload = {
        uniqueIdentifier : `${formData.date}-${formData.OPDTime}-${formData.hospital}`,
        hospitalID: formData.hospital,
        time: timeSlots[selectedTimeSlot]?.time || formData.OPDTime,
        date: updatedDate.toISOString(),
        availableCount: timeSlots[timeslotIndex].availableCount - 1,
      }

    const updateSlot = await apiClient.post(`/hospital/${formData.hospital}/timeslots`, payload);
    console.log("Timeslot updated:", updateSlot.data);

    try {
      if(formData.isVirtualOPD){
        const response = await apiClient.post("/opd/schedulemeet", opdData);
        console.log("Virtual Meeting booked:", response.data);
        toast.success("OPD booked successfully!");
      }
      else{
        const register = await apiClient.post("/opd/register", opdData);
        console.log("OPD booked:", register.data);
        toast.success("OPD booked successfully!");
      }
    } catch (error) {
      console.error("Error booking OPD:", error);
      toast.error("Failed to book OPD. Please try again.");
    }
  };

  return (
    <div className="book-opd-page bg-gradient-to-r from-blue-500 to-green-500 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white mb-6">
        Book OPD Appointment
      </h1>
      <form
        onSubmit={handleProceed}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm">{errors.patientName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Hospital</label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            {errors.hospital && (
              <p className="text-red-500 text-sm">{errors.hospital}</p>
            )}
          </div>
          {/* implementing the timeslot selection only after selecting the hospital */}
          {/* {selectedTimeSlot !== undefined ? (
            (selectedTimeSlot !== undefined) && (
              <div>
                <label className="block text-gray-700">Time Slot</label>
                <select
                  name="OPDTime"
                  value={formData.OPDTime}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  {timeSlots.length === 0 ? (
                    <option value="">No Time Slots Available</option>
                  ) : (
                    <>
                      <option value={selectedTimeSlot.id}>
                        {timeSlots[selectedTimeSlot].time}
                      </option>
                    </>
                  )}
                </select>
              </div>
            )
          ) : (

          {formData.hospital && (
            <div>
            <label className="block text-gray-700">Time Slot</label>
            <select
              name="OPDTime"
              value={formData.OPDTime}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              {timeSlots.length === 0 ? (
                <option value="">No Time Slots Available</option>
              ) : (
                <>
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((timeSlot) => (
                    <option key={timeSlot.id} value={timeSlot.id}>
                      {timeSlot.time}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          )}
          )} */}
          {selectedTimeSlot !== undefined ? (
  <div>
    <label className="block text-gray-700">Time Slot</label>
    <select
      name="OPDTime"
      value={formData.OPDTime}
      onChange={handleChange}
      className="w-full border rounded p-2"
    >
      {timeSlots.length === 0 ? (
        <option value="">No Time Slots Available</option>
      ) : (
        <option value={selectedTimeSlot.id}>
          {/* {timeSlots.find((slot) => slot.id === selectedTimeSlot.id)?.time || "Invalid Slot"} */}
          {timeSlots[selectedTimeSlot].time || "Invalid Slot"}
        </option>
      )}
    </select>
  </div>
) : formData.hospital ? (
  <div>
    <label className="block text-gray-700">Time Slot</label>
    <select
      name="OPDTime"
      value={formData.OPDTime}
      onChange={handleChange}
      className="w-full border rounded p-2"
    >
      {timeSlots.length === 0 ? (
        <option value="">No Time Slots Available</option>
      ) : (
        <>
          <option value="">Select Time Slot</option>
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot.id} value={timeSlot.id}>
              {timeSlot.time}
            </option>
          ))}
        </>
      )}
    </select>
  </div>
) : null}

          <div>
            <label className="block text-gray-700">Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.user.username}
                </option>
              ))}
            </select>
            {errors.doctor && (
              <p className="text-red-500 text-sm">{errors.doctor}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Symptoms</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full border rounded p-2"
            ></textarea>
            {errors.symptoms && (
              <p className="text-red-500 text-sm">{errors.symptoms}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Appointment Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Virtual OPD</label>
            <input
              type="checkbox"
              name="isVirtualOPD"
              checked={formData.isVirtualOPD}
              onChange={(e) =>
                setFormData({ ...formData, isVirtualOPD: e.target.checked })
              }
              className="w-4 h-4"
            />
          </div>
        <div>
          <label className="block text-gray-700">Follow-up</label>
          <input
            type="checkbox"
            name="followUp"
            checked={formData.followUp}
            onChange={(e) => setFormData({ ...formData, followUp: e.target.checked })}
            className="w-4 h-4"
          />
        </div>

        {formData.followUp && (
          <div>
            <label className="block text-gray-700">Follow-up Reason</label>
            <input
              type="text"
              name="followUpReason"
              value={formData.followUpReason}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        {formData.followUp && (
          <div>
            <label className="block text-gray-700">Follow-up Prescription</label>
            <input
              type="text"
              name="followUpPrescription"
              value={formData.followUpPrescription}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        
        </div>
        {/* Follow-up fields */}

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookOPDPage;


