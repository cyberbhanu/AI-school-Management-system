import React from "react";
import Navbar from "../Layout/Navbar";
import {
  FaUsers,
  FaUserPlus,
  FaSchool,
  FaListAlt,
  FaChartBar
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>

        <div className="dashboard-grid">
          <div className="card">
            <FaUserPlus className="card-icon" />
            <h3>Add User</h3>
            <p>Add students and teachers</p>
            <a className="action-btn" href="/add-user">
              Add User
            </a>
          </div>

          <div className="card">
            <FaUsers className="card-icon" />
            <h3>All Users</h3>
            <p>View system users</p>
            <a className="action-btn secondary" href="/users">
              View Users
            </a>
          </div>

          <div className="card">
            <FaSchool className="card-icon" />
            <h3>Add Class</h3>
            <p>Create and assign classes</p>
            <a className="action-btn" href="/add-class">
              Add Class
            </a>
          </div>

          <div className="card">
            <FaListAlt className="card-icon" />
            <h3>All Classes</h3>
            <p>View all classes</p>
            <a className="action-btn secondary" href="/classes">
              View Classes
            </a>
          </div>

          <div className="card">
            <FaChartBar className="card-icon" />
            <h3>Attendance Reports</h3>
            <p>Monitor attendance</p>
            <a className="action-btn danger" href="/attendance">
              View Reports
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
