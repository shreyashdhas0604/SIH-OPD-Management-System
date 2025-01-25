import React, { useState, useEffect } from 'react';
import apiClient from '../api/ApiClient';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    age: null,
    gender: '',
    address: '',
    contactNumber: '',
    insuranceCard: '',
    rationCard: '',
    permanentIllness: '',
    avatar: '',
    role: '',
  });

  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/user/me');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);

    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      if (key !== 'avatar') {
        formData.append(key, userData[key]);
      }
    });

    if (newAvatar) {
      formData.append('avatar', newAvatar);
    }

    try {
      const updatedUser = await apiClient.put('/user/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUserData(updatedUser.data.data);
      console.log('User data saved:', updatedUser.data.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const userRenderDetails = () => {
    return (
      <div className="bg-white text-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-6 lg:p-10">
        <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">User Profile</h1>
        <div className="flex flex-col items-center mb-8">
          <img
            src={newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500 shadow-md"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-md font-medium">Username :</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg text-blue-500 font-medium">{userData.username}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium">Email :</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium">Age :</label>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={userData.age || ''}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.age}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium">Gender :</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.gender}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-md font-medium">Address :</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.address}</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium">Insurance Card :</label>
            {isEditing ? (
              <input
                type="text"
                name="insuranceCard"
                value={userData.insuranceCard}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.insuranceCard}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium">Ration Card :</label>
            {isEditing ? (
              <input
                type="text"
                name="rationCard"
                value={userData.rationCard}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.rationCard}</p>
            )}
          </div>
          <div className="lg:col-span-2">
            <label className="block text-md font-medium">Permanent Illness :</label>
            {isEditing ? (
              <input
                type="text"
                name="permanentIllness"
                value={userData.permanentIllness}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg  text-blue-500 font-medium">{userData.permanentIllness}</p>
            )}
          </div>
          
            <div className="lg:col-span-2">
                <label className="block text-md font-medium">Role :</label>
                <p className="text-lg  text-blue-500 font-medium">{userData.role}</p>
            </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    );
    };


    const doctorRenderDetails = () => {
        return (
            <div className="bg-white text-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-6 lg:p-10">
            <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">Doctor Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                <label className="block text-md font-medium">Specialization :</label>
                {isEditing ? (
                    <input
                    type="text"
                    name="specialization"
                    value={userData.doctorInfo?.specialization || ''}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.specialization || 'N/A'}</p>
                )}
                </div>
                <div>
                <label className="block text-md font-medium">Qualification :</label>
                {isEditing ? (
                    <input
                    type="text"
                    name="qualification"
                    value={userData.doctorInfo?.qualification || ''}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.qualification || 'N/A'}</p>
                )}
                </div>
                <div>
                <label className="block text-md font-medium">Experience :</label>
                {isEditing ? (
                    <input
                    type="number"
                    name="experience"
                    value={userData.doctorInfo?.experience || ''}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.experience || 'N/A'} years</p>
                )}
                </div>
                <div>
                <label className="block text-md font-medium">Hospital :</label>
                {isEditing ? (
                    <input
                    type="text"
                    name="hospital"
                    value={userData.doctorInfo?.hospital?.name || ''}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.hospital?.name || 'N/A'}</p>
                )}
                </div>
                <div>
                <label className="block text-md font-medium">Department :</label>
                {isEditing ? (
                    <input
                    type="text"
                    name="department"
                    value={userData.doctorInfo?.department?.name || ''}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.department?.name || 'N/A'}</p>
                )}
                </div>
                <div>
                <label className="block text-md font-medium">Availability :</label>
                {isEditing ? (
                    <select
                    name="isAvailable"
                    value={userData.doctorInfo?.isAvailable ? 'Available' : 'Not Available'}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                    </select>
                ) : (
                    <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.isAvailable ? 'Available' : 'Not Available'}</p>
                )}
                </div>
                <div className="lg:col-span-2">
                <label className="block text-md font-medium">Ratings :</label>
                <p className="text-lg text-blue-500 font-medium">{userData.doctorInfo?.ratings || 'N/A'}</p>
                </div>
            </div>
            </div>
        );
    }

    const opdRenderDetails = () => {
        return (
            <div className="bg-white text-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-6 lg:p-10">
            <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">OPD Details</h1>
            {userData.registrations && userData.registrations.map((registration, index) => (
                <div key={index} className="mb-8">
                <div className="flex flex-col items-center mb-4">
                    <img
                    src={registration.doctor.user.avatar}
                    alt="Doctor Avatar"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500 shadow-md"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-md font-medium">Doctor Name :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.doctor.user.username}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">Doctor Email :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.doctor.user.email}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">Doctor Contact Number :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.doctor.user.contactNumber}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">Hospital Name :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.hospital.name}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">Hospital Speciality :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.hospital.speciality}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">Hospital Address :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.hospital.address}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">OPD Time :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.OPDTime}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">OPD Date :</label>
                    <p className="text-lg text-blue-500 font-medium">{`${new Date(registration.date).toLocaleDateString()}`}</p>
                    </div>
                    <div>
                    <label className="block text-md font-medium">OPD Type :</label>
                    <p className="text-lg text-blue-500 font-medium">{registration.isVirtualOPD === true ? ("Virtual") : ("In Hospital")}</p>
                    </div>
                    <div>
        </div>            <label className="block text-md font-medium">OPD Booked Date :</label>
                    <p className="text-lg text-blue-500 font-medium">{`${new Date(registration.updatedAt).toLocaleDateString()}`}</p>
                    </div>
                </div>
            ))}
                {userData.doctorInfo?.registrations &&
                userData.doctorInfo.registrations.map((registration, index) => (
                    <div key={index} className="mb-8">
                    <div className="flex flex-col items-center mb-4">
                        <img
                        src={userData.avatar || "/default-avatar.png"} // User's avatar is directly from userData
                        alt="Doctor Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500 shadow-md"
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-md font-medium">Patient Name :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration.patient.username || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Doctor :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {userData.username || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Patient Email :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration.patient.email || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Patient Contact Number :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration.patient.contactNumber || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Hospital Name :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {userData.doctorInfo?.hospital?.name || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Hospital Speciality :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {userData.doctorInfo?.hospital?.speciality || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">Hospital Address :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {userData.doctorInfo?.hospital?.address || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">OPD Time :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration?.OPDTime || "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">OPD Date :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration?.date ? new Date(registration.date).toLocaleDateString() : "N/A"}
                        </p>
                        </div>
                        <div>
                        <label className="block text-md font-medium">OPD Type :</label>
                        <p className="text-lg text-blue-500 font-medium">
                            {registration?.isVirtualOPD === true ? "Virtual" : "In Hospital"}
                        </p>
                        </div>
                    </div>
                    </div>
                ))
                }
            </div>
        );
        };

    const adminRenderDetails = () => {
      return (
        <div className="bg-white text-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-6 lg:p-10">
          <h1 className="text-2xl text-center text-blue-500 font-bold mt-6 mb-4">Managed Hospitals</h1>
          {userData.managedHospitals && userData.managedHospitals.length > 0 ? (
            userData.managedHospitals.map((hospital, index) => (
              <div key={index} className="mb-8">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={hospital.hospitalImageUrl[0]}
                    alt="Hospital"
                    className="w-124 h-96 rounded-md object-cover mb-4 border-4 border-teal-500 shadow-md"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-md font-medium">Hospital Name :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.name}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Speciality :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.speciality}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Address :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.address}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Contact Number :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.contactNumber}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Registration Number :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Total Beds :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.totalBeds}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Timings :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.timings}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Established Date :</label>
                    <p className="text-lg text-blue-500 font-medium">{new Date(hospital.establishedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-md font-medium">Verified Status :</label>
                    <p className="text-lg text-blue-500 font-medium">{hospital.isVerified}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-blue-500 font-medium">No hospitals managed.</p>
          )}
        </div>
      );
    };



return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 gap-6">
            {userRenderDetails()}
            {userData.role === 'Doctor' && doctorRenderDetails()}
            {opdRenderDetails()}
            {userData.role === 'Admin' && adminRenderDetails()}
        </div>
    </div>
);
}
export default UserProfile;