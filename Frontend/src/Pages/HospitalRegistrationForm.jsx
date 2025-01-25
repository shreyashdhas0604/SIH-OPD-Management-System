// import React, { useState } from 'react';
// import apiClient from '../api/ApiClient';

// const HospitalRegistrationForm = () => {
//   const adminDetails = JSON.parse(localStorage.getItem('user')) || {};
//   const [hospitalDetails, setHospitalDetails] = useState({
//     name: '',
//     speciality: '',
//     address: '',
//     registrationNumber: '',
//     contactNumber: '',
//     timings: '',
//     totalBeds: '',
//     totalPersonsPerSlot: '',
//     establishedDate: '',
//     rating: 0.0,
//     isVerified: 'Pending',
//     adminID: adminDetails.id || 1,
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const specialities = [
//     'Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics',
//     'Gynecology & Obstetrics', 'Dermatology', 'Gastroenterology', 'Pulmonology',
//     'Endocrinology', 'Nephrology', 'Urology', 'Ophthalmology', 'ENT (Ear, Nose, and Throat)',
//     'Rheumatology', 'Psychiatry', 'General Surgery', 'Plastic and Reconstructive Surgery',
//     'Anesthesiology', 'Radiology', 'Hematology', 'Emergency Medicine', 'Geriatrics',
//     'Infectious Disease', 'Palliative Care'
//   ];

//   const [showCustomSpecialityInput, setShowCustomSpecialityInput] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setHospitalDetails({
//       ...hospitalDetails,
//       [name]: value,
//     });
//   };

//   const handleSpecialityChange = (e) => {
//     const value = e.target.value;
//     if (value === 'custom') {
//       setShowCustomSpecialityInput(true);
//       setHospitalDetails((prev) => ({ ...prev, speciality: '' }));
//     } else {
//       setShowCustomSpecialityInput(false);
//       setHospitalDetails((prev) => ({ ...prev, speciality: value }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles((prevFiles) => [...prevFiles, ...files]);
//   };

//   const handleRemoveImage = (index) => {
//     setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       const formData = new FormData();
//       Object.keys(hospitalDetails).forEach((key) => {
//         formData.append(key, hospitalDetails[key]);
//       });
//       imageFiles.forEach((file) => {
//         formData.append('hospitalImages', file);
//       });

//       await apiClient.post('/hospital/create-hospital', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setMessage({ type: 'success', text: 'Hospital registered successfully!' });
//       setHospitalDetails({
//         name: '',
//         speciality: '',
//         address: '',
//         registrationNumber: '',
//         contactNumber: '',
//         timings: '',
//         totalBeds: '',
//         totalPersonsPerSlot: '',
//         establishedDate: '',
//         rating: 0.0,
//         isVerified: 'Pending',
//         adminID: adminDetails.id || 1,
//       });
//       setImageFiles([]);
//       setShowCustomSpecialityInput(false);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong!' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center py-6">
//       <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Hospital Registration</h2>
//         {message.text && (
//           <div
//             className={`text-center p-3 mb-4 ${
//               message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//             } rounded-lg`}
//           >
//             {message.text}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Hospital Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={hospitalDetails.name}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter hospital name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Speciality</label>
//               <select
//                 name="speciality"
//                 value={hospitalDetails.speciality || (showCustomSpecialityInput ? 'custom' : '')}
//                 onChange={handleSpecialityChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               >
//                 <option value="" disabled>Select a speciality</option>
//                 {specialities.map((speciality) => (
//                   <option key={speciality} value={speciality}>
//                     {speciality}
//                   </option>
//                 ))}
//                 <option value="custom">Other (Type custom speciality)</option>
//               </select>
//               {showCustomSpecialityInput && (
//                 <input
//                   type="text"
//                   name="speciality"
//                   value={hospitalDetails.speciality}
//                   onChange={handleInputChange}
//                   placeholder="Enter custom speciality"
//                   className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               )}
//             </div>
//           </div>

//           <div>
//               <label className="block text-lg font-medium text-gray-600">Address</label>
//               <input
//               type="text"
//               name="address"
//               value={hospitalDetails.address}
//               onChange={handleInputChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter hospital address"
//               required
//             />
//           </div>

//           {/* Other fields here */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Registration Number</label>
//               <input
//                 type="text"
//                 name="registrationNumber"
//                 value={hospitalDetails.registrationNumber}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter registration number"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-600">Contact Number</label>
//               <input
//                 type="text"
//                 name="contactNumber"
//                 value={hospitalDetails.contactNumber}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter contact number"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Timings</label>
//               <input
//                 type="text"
//                 name="timings"
//                 value={hospitalDetails.timings}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter hospital timings"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-600">Total Beds</label>
//               <input
//                 type="number"
//                 name="totalBeds"
//                 value={hospitalDetails.totalBeds}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter total beds"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Persons per Slot</label>
//               <input
//                 type="number"
//                 name="totalPersonsPerSlot"
//                 value={hospitalDetails.totalPersonsPerSlot}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter persons per slot"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-600">Established Date</label>
//               <input
//               type="date"
//               name="establishedDate"
//               value={hospitalDetails.establishedDate}
//               onChange={handleInputChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>
//         </div>

//           {/* Other fields */}
//           <div>
//             <label className="block text-lg font-medium text-gray-600">Hospital Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               accept="image/*"
//             />
//             <div className="mt-4 flex flex-wrap gap-4">
//               {imageFiles.map((file, index) => (
//                 <div
//                   key={index}
//                   className="relative w-32 h-32 border rounded-lg overflow-hidden flex justify-center items-center"
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Selected ${index}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             disabled={loading}
//           >
//             {loading ? 'Registering...' : 'Register Hospital'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HospitalRegistrationForm;


import React, { useState } from 'react';
import apiClient from '../api/ApiClient';

const HospitalRegistrationForm = () => {
  const adminDetails = JSON.parse(localStorage.getItem('user')) || {};
  const [hospitalDetails, setHospitalDetails] = useState({
    name: '',
    speciality: '',
    address: '',
    registrationNumber: '',
    contactNumber: '',
    timings: '',
    totalBeds: '',
    totalPersonsPerSlot: '',
    establishedDate: '',
    rating: 0.0,
    isVerified: 'Pending',
    adminID: adminDetails.id || 1,
    opdTimeslots: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [newTimeslot, setNewTimeslot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showCustomSpecialityInput, setShowCustomSpecialityInput] = useState(false);

  const specialities = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics',
    'Gynecology & Obstetrics', 'Dermatology', 'Gastroenterology', 'Pulmonology',
    'Endocrinology', 'Nephrology', 'Urology', 'Ophthalmology', 'ENT (Ear, Nose, and Throat)',
    'Rheumatology', 'Psychiatry', 'General Surgery', 'Plastic and Reconstructive Surgery',
    'Anesthesiology', 'Radiology', 'Hematology', 'Emergency Medicine', 'Geriatrics',
    'Infectious Disease', 'Palliative Care'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalDetails({
      ...hospitalDetails,
      [name]: value,
    });
  };

  const handleSpecialityChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomSpecialityInput(true);
      setHospitalDetails((prev) => ({ ...prev, speciality: '' }));
    } else {
      setShowCustomSpecialityInput(false);
      setHospitalDetails((prev) => ({ ...prev, speciality: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleTimeslotAdd = () => {
    if (newTimeslot.trim() !== '') {
      setHospitalDetails((prev) => ({
        ...prev,
        opdTimeslots: [...prev.opdTimeslots, newTimeslot],
      }));
      setNewTimeslot('');
    }
  };

  const handleRemoveTimeslot = (index) => {
    setHospitalDetails((prev) => ({
      ...prev,
      opdTimeslots: prev.opdTimeslots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.keys(hospitalDetails).forEach((key) => {
        if (key === 'opdTimeslots') {
          formData.append(key, JSON.stringify(hospitalDetails[key]));
        } else {
          formData.append(key, hospitalDetails[key]);
        }
      });
      imageFiles.forEach((file) => {
        formData.append('hospitalImages', file);
      });

      await apiClient.post('/hospital/create-hospital', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'Hospital registered successfully!' });
      setHospitalDetails({
        name: '',
        speciality: '',
        address: '',
        registrationNumber: '',
        contactNumber: '',
        timings: '',
        totalBeds: '',
        totalPersonsPerSlot: '',
        establishedDate: '',
        rating: 0.0,
        isVerified: 'Pending',
        adminID: adminDetails.id || 1,
        opdTimeslots: [],
      });
      setImageFiles([]);
      setNewTimeslot('');
      setShowCustomSpecialityInput(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center py-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Hospital Registration</h2>
        {message.text && (
          <div
            className={`text-center p-3 mb-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            } rounded-lg`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Hospital Name</label>
              <input
                type="text"
                name="name"
                value={hospitalDetails.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter hospital name"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Speciality</label>
              <select
                name="speciality"
                value={hospitalDetails.speciality || (showCustomSpecialityInput ? 'custom' : '')}
                onChange={handleSpecialityChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="" disabled>Select a speciality</option>
                {specialities.map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
                <option value="custom">Other (Type custom speciality)</option>
              </select>
              {showCustomSpecialityInput && (
                <input
                  type="text"
                  name="speciality"
                  value={hospitalDetails.speciality}
                  onChange={handleInputChange}
                  placeholder="Enter custom speciality"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              )}
            </div>
          </div>

          {/* OPD Timeslots */}
          <div>
            <label className="block text-lg font-medium text-gray-600">OPD Timeslots</label>
            <div className="flex gap-4 mt-2">
              <input
                type="text"
                value={newTimeslot}
                onChange={(e) => setNewTimeslot(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 9:00 AM - 10:00 AM"
              />
              <button
                type="button"
                onClick={handleTimeslotAdd}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {hospitalDetails.opdTimeslots.map((slot, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span>{slot}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeslot(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
               <label className="block text-lg font-medium text-gray-600">Address</label>
               <input
              type="text"
              name="address"
              value={hospitalDetails.address}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter hospital address"
              required
            />
          </div>

          {/* Other fields here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                value={hospitalDetails.registrationNumber}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter registration number"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-600">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={hospitalDetails.contactNumber}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Timings</label>
              <input
                type="text"
                name="timings"
                value={hospitalDetails.timings}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter hospital timings"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-600">Total Beds</label>
              <input
                type="number"
                name="totalBeds"
                value={hospitalDetails.totalBeds}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter total beds"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Persons per Slot</label>
              <input
                type="number"
                name="totalPersonsPerSlot"
                value={hospitalDetails.totalPersonsPerSlot}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter persons per slot"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Established Date</label>
              <input
              type="date"
              name="establishedDate"
              value={hospitalDetails.establishedDate}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

          {/* Other fields */}
          <div>
            <label className="block text-lg font-medium text-gray-600">Hospital Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              accept="image/*"
            />
            <div className="mt-4 flex flex-wrap gap-4">
              {imageFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden flex justify-center items-center"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Hospital'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegistrationForm;
