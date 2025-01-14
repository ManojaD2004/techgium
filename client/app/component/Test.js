"use client";
import React, { useRef, useEffect, useState } from "react";

const VideoFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [turnOnOff, setTurnOnOff] = useState(false);

  const captureAndSendFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/png");

    try {
      const response = await fetch("http://localhost:9000/v1/image/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageURL: base64Image,
        }),
      });

      const data = await response.json();
      if (data.message === "success") {
        console.log("Image sent successfully");
      } else {
        console.log("Failed to send image:", data.data);
      }
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  useEffect(() => {
    if (!window) {
      return;
    }
    if (!turnOnOff) {
      videoRef.current.srcObject = null;
      return;
    }
    const startVideoStream = async () => {
      try {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideoStream();

    const intervalId = setInterval(captureAndSendFrame, 5000);

    return () => clearInterval(intervalId);
  }, [turnOnOff]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <video
        ref={videoRef}
        autoPlay
        muted
        onLoadedMetadata={() => {
          const video = videoRef.current;
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;
        }}
      />
      <button className="block" onClick={() => setTurnOnOff(!turnOnOff)}>Turn On/Off</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default VideoFeed;
