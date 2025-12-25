import React, { useEffect, useRef } from "react";
import Navbar from "../Layout/Navbar";
import socket from "../../socket";

export default function TeacherLiveClass() {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    socket.emit("join-class", "live-class");

    socket.on("answer", async (answer) => {
      await peerRef.current.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", (candidate) => {
      peerRef.current.addIceCandidate(candidate);
    });
  }, []);

  const startClass = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    videoRef.current.srcObject = streamRef.current;
    videoRef.current.muted = true;
    await videoRef.current.play();

    peerRef.current = new RTCPeerConnection();

    streamRef.current.getTracks().forEach(track =>
      peerRef.current.addTrack(track, streamRef.current)
    );

    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          classId: "live-class",
          candidate: e.candidate
        });
      }
    };

    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socket.emit("offer", {
      classId: "live-class",
      offer
    });
  };

  const stopClass = () => {
    streamRef.current.getTracks().forEach(t => t.stop());
    peerRef.current.close();
    videoRef.current.srcObject = null;
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: 30 }}>
        <h2>🎥 Teacher Live Class</h2>

        <video
          ref={videoRef}
          style={{ width: "70%", background: "#000" }}
          autoPlay
          playsInline
        />

        <br /><br />

        <button className="primary-btn" onClick={startClass}>
          ▶ Start Class
        </button>

        <button className="danger-btn" onClick={stopClass}>
          ⛔ End Class
        </button>
      </div>
    </>
  );
}
