import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DailyIframe from "@daily-co/daily-js";
import apiClient from "../api/ApiClient";

export default function Video() {
  const { id } = useParams();
  const videoContainerRef = useRef(null);
  const dailyIframeRef = useRef(null);

  useEffect(() => {
    const domain = "https://medqueu.daily.co/";

    // Clean up existing iframe instance if it exists
    if (dailyIframeRef.current) {
      console.log("Destroying existing DailyIframe instance...");
      dailyIframeRef.current.destroy();
      dailyIframeRef.current = null;
    }

    let isCancelled = false;

    apiClient
      .get(`/opd/video-call/${id}`)
      .then((res) => {
        if (res.status === 200 && !isCancelled) {
          const iframe = DailyIframe.createFrame(videoContainerRef.current, {
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999,
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          });

          dailyIframeRef.current = iframe;

          const user = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : { username: "Anonymous" };

          iframe.join({
            url: `${domain}${id}`,
            userName: `${user.username}`,
          });

          console.log("DailyIframe instance created successfully.");
        }
      })
      .catch((err) => {
        console.error("Error fetching video call details:", err);
      });

    // Cleanup function
    return () => {
      isCancelled = true; // Prevent iframe creation after unmount
      if (dailyIframeRef.current) {
        console.log("Cleaning up DailyIframe instance...");
        dailyIframeRef.current.destroy();
        dailyIframeRef.current = null;
      }
    };
  }, [id]);

  const enterFullscreen = () => {
    if (videoContainerRef.current.requestFullscreen) {
      videoContainerRef.current.requestFullscreen();
    } else if (videoContainerRef.current.webkitRequestFullscreen) {
      videoContainerRef.current.webkitRequestFullscreen();
    } else if (videoContainerRef.current.msRequestFullscreen) {
      videoContainerRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
        <div ref={videoContainerRef} className="w-full h-full"></div>
        <button
          onClick={enterFullscreen}
          className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
