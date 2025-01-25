import React, { useEffect, useState } from 'react';
import apiClient from '../api/ApiClient';
import { useNavigate } from 'react-router-dom';

const AllDoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('/doctor/getAllDoctors')
            .then(response => {
                console.log('All doctors:', response.data);
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    }, []);

    const handleRedirect = (hospitalID) => {
        navigate(`/specific-hospital/${hospitalID}`);
    };

    const filteredDoctors = doctors.filter(doctor => 
        doctor.user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specializationFilter ? doctor.specialization === specializationFilter : true)
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-600 via-blue-500 to-indigo-400 flex flex-col">
            <header className="bg-transparent p-6 text-center text-white">
                <h1 className="text-3xl font-semibold">All Doctors</h1>
                <p className="text-xl mt-2">Find doctors by specialization and availability</p>
            </header>
            
            <div className="flex justify-center gap-6 p-6 bg-transparent">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    className="border p-3 rounded-lg w-full md:w-1/3 lg:w-1/4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="border p-3 rounded-lg w-full md:w-1/3 lg:w-1/4"
                    value={specializationFilter}
                    onChange={(e) => setSpecializationFilter(e.target.value)}
                >
                    <option value="">All Specializations</option>
                    {Array.from(new Set(doctors.map(doctor => doctor.specialization))).map(specialization => (
                        <option key={specialization} value={specialization}>{specialization}</option>
                    ))}
                </select>
            </div>

            <div className="bg-transparent flex flex-wrap justify-center gap-8 p-6">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                        <h2 className="text-2xl font-semibold text-teal-800">{doctor.user.username}</h2>
                        <p className="text-gray-700"><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p className="text-gray-700"><strong>Qualification:</strong> {doctor.qualification}</p>
                        <p className="text-gray-700"><strong>Experience:</strong> {doctor.experience} years</p>
                        <p className="text-gray-700"><strong>Department:</strong> {doctor.department?.name}</p>
                        <p className="text-gray-700"><strong>Available:</strong> {doctor.isAvailable ? 'Yes' : 'No'}</p>
                        <button 
                            className="mt-4 bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300"
                            onClick={() => handleRedirect(doctor.hospitalID)}
                        >
                            View Hospital
                        </button>
                    </div>
                ))}
            </div>

            <footer className="bg-transparent text-center py-4 text-white">
                <p>Powered by Your MedQueu Platform</p>
            </footer>
        </div>
    );
};

export default AllDoctorsPage;
