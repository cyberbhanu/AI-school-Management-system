
import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaCalendarCheck,
  FaVideo
} 


from "react-icons/fa";

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  // Load teacher classes
  useEffect(() => {
    API.get("/classes").then(res => setClasses(res.data));
  }, []);

  const startLiveClass = (classId) => {
    navigate(`/live/${classId}`);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Teacher Dashboard</h2>

        <div className="dashboard-grid">

          {/* ADD CLASS */}
          <div className="card">
            <FaChalkboardTeacher className="card-icon" />
            <h3>Add Class</h3>
            <p>Create and manage classes</p>
            <a className="action-btn" href="/add-class">
              Add Class
            </a>
          </div>

          {/* MY CLASSES */}
          <div className="card">
            <FaBook className="card-icon" />
            <h3>My Classes</h3>
            <p>View assigned classes</p>
            <a className="action-btn secondary" href="/classes">
              View Classes
            </a>
          </div>

          {/* ADD ASSIGNMENT */}
          <div className="card">
            <FaClipboardList className="card-icon" />
            <h3>Add Assignment</h3>
            <p>Create assignments</p>
            <a className="action-btn" href="/add-assignment">
              Add Assignment
            </a>
          </div>

          {/* ATTENDANCE */}
          <div className="card">
            <FaCalendarCheck className="card-icon" />
            <h3>Attendance</h3>
            <p>Mark student attendance</p>
            <a className="action-btn secondary" href="/mark-attendance">
              Mark Attendance
            </a>
          </div>

          {/* LIVE CLASS (FIXED) */}
          <div className="card">
            <FaVideo className="card-icon" />
            <h3>Live Class</h3>
            <p>Start live session</p>

            {classes.length === 0 ? (
              <p>No classes available</p>
            ) : (
              classes.map(c => (
                <button
                  key={c._id}
                  className="action-btn danger"
                  style={{ marginBottom: 6 }}
                  onClick={() => startLiveClass(c._id)}
                >
                  Start {c.name}
                </button>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}
