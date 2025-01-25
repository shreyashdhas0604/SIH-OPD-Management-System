import React, { useState } from 'react';
import axios from 'axios';
import VirtualOPD from '../Components/VirtualOPD';

const VirtualOPDPage = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const createRoom = async () => {
    try {
      // Replace with your Daily.co API Key and subdomain
      const apiKey = 'f73d763d430a2391baac4f204673bb47199d3058b5920e7622aeb45eeaabb888';
      const subDomain = 'medqueu'; // Your subdomain
      const roomName = 'test-room'; // Change as necessary

      const response = await axios.post(
        `/daily-api/v1/rooms`,
        {
          properties: {
            enable_audio: true,
            enable_video: true,
            enable_screen_sharing: true,
            enable_chat: true,
            room_name: roomName,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      if (data.error) {
        console.error('Error creating room:', data.error);
        return;
      }

      setRoomUrl(data.url);
      setIsRoomCreated(true);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h1>Video Call</h1>
      {!isRoomCreated ? (
        <button onClick={createRoom}>Create Video Room</button>
      ) : (
        <div>
          <p>Room created! Click below to join the video call.</p>
          <VirtualOPD roomUrl={roomUrl} />
        </div>
      )}
    </div>
  );
};

export default VirtualOPDPage;
