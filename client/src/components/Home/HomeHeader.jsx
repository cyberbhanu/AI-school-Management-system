import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function HomeHeader({ onLogin, onSignup }) {
  const handleLogin = () => {
    if (onLogin) {
      onLogin(); // open popup (Home page)
    } else {
      window.location.href = "/login"; // fallback
    }
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup(); // open popup (Home page)
    } else {
      window.location.href = "/register"; // fallback
    }
  };

  return (
    <nav className="home-navbar">
      {/* ===== Logo ===== */}
      <div className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          AI School
        </Link>
      </div>

      {/* ===== Navigation ===== */}
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

      {/* ===== Actions ===== */}
      <div className="nav-actions">
        <button className="outline-btn" onClick={handleSignup}>
          Enquire Now
        </button>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <button className="signup-btn" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </nav>
  );
}
