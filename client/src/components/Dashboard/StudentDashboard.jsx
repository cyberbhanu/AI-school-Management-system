import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaTasks,
  FaCalendarAlt,
  FaRobot,
  FaVideo
} from "react-icons/fa";

export default function StudentDashboard() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  // Load classes student can join
  useEffect(() => {
    API.get("/classes").then(res => setClasses(res.data));
  }, []);

  const joinLiveClass = (classId) => {
    navigate(`/live/${classId}`);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Student Dashboard</h2>

        <div className="dashboard-grid">

          {/* MY CLASSES */}
          <div className="card">
            <FaBookOpen className="card-icon" />
            <h3>My Classes</h3>
            <p>View enrolled classes</p>
            <a className="action-btn" href="/classes">
              View Classes
            </a>
          </div>

          {/* ASSIGNMENTS */}
          <div className="card">
            <FaTasks className="card-icon" />
            <h3>Assignments</h3>
            <p>Check pending assignments</p>
            <a className="action-btn secondary" href="/assignments">
              View Assignments
            </a>
          </div>

          {/* ATTENDANCE */}
          <div className="card">
            <FaCalendarAlt className="card-icon" />
            <h3>Attendance</h3>
            <p>View your attendance record</p>
            <a className="action-btn" href="/attendance">
              View Attendance
            </a>
          </div>

          {/* AI DOUBT */}
          <div className="card">
            <FaRobot className="card-icon" />
            <h3>AI Learning Assistant</h3>
            <p>Ask your academic doubts</p>
            <a className="action-btn secondary" href="/doubt">
              Ask AI
            </a>
          </div>

          {/* LIVE CLASS (FIXED) */}
          <div className="card">
            <FaVideo className="card-icon" />
            <h3>Live Class</h3>
            <p>Join live session</p>

            {classes.length === 0 ? (
              <p>No live classes available</p>
            ) : (
              classes.map(c => (
                <button
                  key={c._id}
                  className="action-btn danger"
                  style={{ marginBottom: 6 }}
                  onClick={() => joinLiveClass(c._id)}
                >
                  Join {c.name}
                </button>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}
