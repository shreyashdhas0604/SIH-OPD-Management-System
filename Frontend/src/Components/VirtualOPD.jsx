// import React, { useState, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';

const VirtualOPD = ({ roomUrl }) => {
  const [callFrame, setCallFrame] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Initialize the callFrame
    const callFrame = DailyIframe.createCallObject();
    setCallFrame(callFrame);

    // Clean up the call frame on component unmount
    return () => {
      if (callFrame) {
        callFrame.destroy();
      }
    };
  }, []);

  // Function to join the room
  const joinRoom = () => {
    if (callFrame) {
      callFrame.join({ url: roomUrl });
      setIsJoined(true);

      // Listen for changes in camera stream
      callFrame.on('camera-change', () => {
        console.log('Camera change detected');
      });
    }
  };

  // Function to leave the room
  const leaveRoom = () => {
    if (callFrame) {
      callFrame.leave();
      setIsJoined(false);
    }
  };

  return (
    <div>
      {!isJoined ? (
        <button onClick={joinRoom}>Join Video Call</button>
      ) : (
        <button onClick={leaveRoom}>Leave Video Call</button>
      )}
      <div id="video-container" style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0' }}></div>
    </div>
  );
};

export default VirtualOPD;
