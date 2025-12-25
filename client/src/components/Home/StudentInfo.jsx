import React from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import "./Home.css";

export default function StudentInfo() {
  return (
    <>
      {/* ===== Common Home Header ===== */}
      <HomeHeader />

      <div className="page-container">
        <div className="school-hero">
          <h1>Student Portal</h1>
          <p>
            A personalized learning platform to attend classes, manage
            assignments, track attendance, and get AI-powered academic help.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Student Login
            </Link>
            <Link to="/register" className="secondary-btn">
              Student Signup
            </Link>
          </div>
        </div>

        <section className="features">
          <h2>What Students Can Do</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>📖 My Classes</h3>
              <p>
                View enrolled classes and access learning materials anytime.
              </p>
            </div>

            <div className="feature-card">
              <h3>📝 Assignments</h3>
              <p>
                Submit assignments online and check evaluation status.
              </p>
            </div>

            <div className="feature-card">
              <h3>📅 Attendance</h3>
              <p>
                Track your attendance records digitally and accurately.
              </p>
            </div>

            <div className="feature-card">
              <h3>🤖 AI Doubt Solver</h3>
              <p>
                Get instant AI-powered solutions for academic doubts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
