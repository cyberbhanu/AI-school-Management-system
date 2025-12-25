import React from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import "./Home.css";

export default function TeacherInfo() {
  return (
    <>
      {/* ===== Common Home Header ===== */}
      <HomeHeader />

      <div className="page-container">
        <div className="school-hero">
          <h1>Teacher Portal</h1>
          <p>
            A smart teaching platform to manage classes, assignments,
            attendance, and conduct live sessions efficiently.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Teacher Login
            </Link>
            <Link to="/register" className="secondary-btn">
              Register as Teacher
            </Link>
          </div>
        </div>

        <section className="features">
          <h2>What Teachers Can Do</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>📚 Class Management</h3>
              <p>
                Create and manage classes, assign subjects, and organize
                lectures.
              </p>
            </div>

            <div className="feature-card">
              <h3>📝 Assignments</h3>
              <p>
                Create assignments, evaluate submissions, and track student
                performance.
              </p>
            </div>

            <div className="feature-card">
              <h3>📊 Attendance</h3>
              <p>
                Mark and manage student attendance digitally with ease.
              </p>
            </div>

            <div className="feature-card">
              <h3>🎥 Live Classes</h3>
              <p>
                Conduct real-time online classes and interact with students.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
