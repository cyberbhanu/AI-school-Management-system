import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HomeHeader from "./HomeHeader";

export default function Home() {
  return (
    <>
      {/* ===== Navbar ===== */}
      <nav className="home-navbar">
        <div className="logo">AI School</div>

        <ul className="nav-links">
          <li>
            <Link to="/school">Schools</Link>
          </li>
          <li>
            <Link to="/teacher-info">Teachers</Link>
          </li>
          <li>
            <Link to="/student-info">Students</Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/register" className="outline-btn">
            Enquire Now
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/register" className="signup-btn">
            Signup
          </Link>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            The Intelligent <span>Classroom</span> Era Begins
          </h1>

          <p>
            AI-powered school management system with smart classrooms,
            assignments, attendance, live classes and intelligent doubt solving.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>
            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Role Description Section ===== */}
      <section className="features">
        <h2>Who Can Use AI School?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🏫 Schools</h3>
            <p>
              Manage students, teachers, classes, attendance, assignments and
              academic activities from a centralized admin dashboard.
            </p>
            <Link to="/school" className="primary-btn">
              Explore School
            </Link>
          </div>

          <div className="feature-card">
            <h3>👩‍🏫 Teachers</h3>
            <p>
              Create classes, upload assignments, mark attendance, conduct live
              classes and interact with students efficiently.
            </p>
            <Link to="/teacher-info" className="primary-btn">
              Explore Teachers
            </Link>
          </div>

          <div className="feature-card">
            <h3>🎓 Students</h3>
            <p>
              Attend live classes, view assignments, track attendance and get
              instant AI-powered doubt resolution.
            </p>
            <Link to="/student-info" className="primary-btn">
              Explore Students
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Section ===== */}
      <section className="features">
        <h2>Why Choose AI School?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Attendance</h3>
            <p>Automated and accurate attendance tracking for students.</p>
          </div>

          <div className="feature-card">
            <h3>Assignments</h3>
            <p>Easy assignment creation, submission and evaluation.</p>
          </div>

          <div className="feature-card">
            <h3>Live Classes</h3>
            <p>Real-time online teaching and interaction.</p>
          </div>

          <div className="feature-card">
            <h3>AI Doubt Solver</h3>
            <p>Instant AI-powered academic doubt resolution.</p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© 2025 AI School Management System</p>
        <p>Developed for Academic Project</p>
      </footer>
    </>
  );
}
