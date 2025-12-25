import React, { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../Layout/Navbar";

export default function MainDashboard() {
  const [stats, setStats] = useState({});
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  useEffect(() => {
    API.get("/dashboard").then(res => setStats(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>📊 Dashboard Overview</h2>

        <div className="dashboard-grid">

          {/* ===== ADMIN ===== */}
          {role === "admin" && (
            <>
              <Card title="👥 Total Users" value={stats.totalUsers} />
              <Card title="👩‍🏫 Teachers" value={stats.totalTeachers} />
              <Card title="🎓 Students" value={stats.totalStudents} />
              <Card title="🏫 Classes" value={stats.totalClasses} />
            </>
          )}

          {/* ===== TEACHER ===== */}
          {(role === "teacher" || role === "admin") && (
            <>
              <Card title="📚 Assignments" value={stats.assignments} />
            </>
          )}

          {/* ===== STUDENT ===== */}
          {(role === "student" || role === "teacher" || role === "admin") && (
            <>
              <Card title="🎓 Total Students" value={stats.totalStudents} />
            </>
          )}

        </div>
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>{value ?? "-"}</p>
    </div>
  );
}
