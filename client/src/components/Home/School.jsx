import React from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import "./Home.css";

export default function School() {
  return (
    <>
      {/* ===== Common Home Header ===== */}
      <HomeHeader />

      <div className="page-container">
        <div className="school-hero">
          <h1>AI School Management</h1>
          <p>
            A centralized AI-powered platform to manage students, teachers,
            classes, attendance, assignments, and academic activities
            efficiently.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Admin Login
            </Link>
            <Link to="/register" className="secondary-btn">
              Register School
            </Link>
          </div>
        </div>

        <section className="features">
          <h2>What Schools Can Do</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>👥 User Management</h3>
              <p>
                Add, manage, and monitor students and teachers from a single
                dashboard.
              </p>
            </div>

            <div className="feature-card">
              <h3>🏫 Class Management</h3>
              <p>
                Create classes, assign teachers, and organize academic sessions.
              </p>
            </div>

            <div className="feature-card">
              <h3>📊 Attendance Reports</h3>
              <p>
                Track attendance digitally with accurate reports and insights.
              </p>
            </div>

            <div className="feature-card">
              <h3>🤖 AI Integration</h3>
              <p>
                Enable AI-powered doubt solving and smart academic assistance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
