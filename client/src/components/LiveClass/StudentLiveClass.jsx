import React, { useEffect, useRef } from "react";
import Navbar from "../Layout/Navbar";
import socket from "../../socket";

export default function StudentLiveClass() {
  const videoRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    socket.emit("join-class", "live-class");

    peerRef.current = new RTCPeerConnection();

    peerRef.current.ontrack = (e) => {
      videoRef.current.srcObject = e.streams[0];
    };

    socket.on("offer", async (offer) => {
      await peerRef.current.setRemoteDescription(offer);
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);

      socket.emit("answer", {
        classId: "live-class",
        answer
      });
    });

    socket.on("ice-candidate", (candidate) => {
      peerRef.current.addIceCandidate(candidate);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: 30 }}>
        <h2>🎓 Live Class (View Only)</h2>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          style={{ width: "70%", background: "#000" }}
        />

        <br /><br />

        <button
          className="danger-btn"
          onClick={() => window.location.href = "/student"}
        >
          🚪 Leave Class
        </button>
      </div>
    </>
  );
}
