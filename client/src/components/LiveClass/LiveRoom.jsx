import React, { useRef, useState } from "react";
import Navbar from "../Layout/Navbar";

export default function LiveRoom() {
  const videoRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState("");

  const startLive = async () => {
    setError("");

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera not supported in this browser");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // 🔥 REQUIRED for autoplay
        await videoRef.current.play();
      }

      setIsLive(true);
    } catch (err) {
      console.error(err);

      if (err.name === "NotAllowedError") {
        setError("Camera/Microphone permission denied");
      } else if (err.name === "NotFoundError") {
        setError("No camera device found");
      } else {
        setError("Failed to start camera");
      }
    }
  };

  const stopLive = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach(track => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsLive(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 30, textAlign: "center" }}>
        <h2>🎥 Live Class</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={styles.videoBox}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={styles.video}
          />
        </div>

        {!isLive ? (
          <button className="primary-btn" onClick={startLive}>
            ▶ Start Camera
          </button>
        ) : (
          <button className="danger-btn" onClick={stopLive}>
            ⛔ Stop Camera
          </button>
        )}
      </div>
    </>
  );
}

const styles = {
  videoBox: {
    width: "80%",
    height: 350,
    margin: "20px auto",
    background: "#000",
    borderRadius: 12
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    objectFit: "cover"
  }
};
