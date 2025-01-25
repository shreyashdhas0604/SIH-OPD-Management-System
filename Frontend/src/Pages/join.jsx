import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import { toast } from "react-hot-toast";

export default function JoinRoom() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [opds, setOpds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user/me`);
        console.log("Response : ",response)
        setOpds(response.data.data.registrations || response.data.data.doctorInfo.registrations);
      } catch (error) {
        console.error("Error fetching OPDs:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async () => {

    if (room.trim()) {
      // navigate(`/video/${room}`);
    } else {
      alert("Please enter a valid room name.");
    }
    const room1 = room.trim();
    const dbRoomName = opds.map(opd => opd.VirtualOPDRoomName);
    for(let i = 0; i < dbRoomName.length; i++){
      if(dbRoomName[i] === room1){
        navigate(`/video/${room1}`);
        return;
      }
    }

    toast.error("Room not found. Please enter a valid room name.");


  };

  const renderNotBookedVirtualOPD = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">You have not booked any Virtual OPD</h1>
          <p className="text-gray-600 mb-6">
            Please book a Virtual OPD to join the meeting.
          </p>
          <button
            onClick={() => navigate("/book-opd")}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Book Virtual OPD
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {opds?.isVirtualOPD ? (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Join a Meeting</h1>
            <p className="text-gray-600 mb-6">
              Enter the room name to join the meeting.
            </p>
            <input
              type="text"
              placeholder="Room Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={onSubmit}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        renderNotBookedVirtualOPD()
      )}
    </>
  );
}
