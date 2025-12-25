import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";
import { Link } from "react-router-dom";

export default function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  /* ===== LOAD CLASSES ===== */
  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(res.data || []);
    } catch {
      console.error("Failed to load classes");
    }
  };

  /* ===== LOAD ASSIGNMENTS ===== */
  const fetchAssignments = async (classId = "") => {
    setLoading(true);
    try {
      const url = classId
        ? `/assignments?classId=${classId}`
        : "/assignments";

      const res = await API.get(url);
      setAssignments(res.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchAssignments();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: 20 }}>
        <h2>📘 Assignments</h2>

        {/* ===== CLASS FILTER ===== */}
        {role !== "student" && (
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              fetchAssignments(e.target.value);
            }}
            style={{ marginBottom: 15 }}
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        )}

        {/* ===== STATES ===== */}
        {loading && <p>Loading assignments...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && assignments.length === 0 && (
          <p>No assignments found.</p>
        )}

        {/* ===== ASSIGNMENT LIST ===== */}
        {assignments.map((a) => {
          const status = a.status || "Pending"; // 👈 SAFE FALLBACK

          return (
            <div key={a._id} style={styles.card}>
              <h4>📄 {a.title}</h4>
              <p>{a.description}</p>

              <div style={styles.meta}>
                {/* ===== DUE DATE ===== */}
                {a.dueDate && (
                  <small>
                    📅 Due: {new Date(a.dueDate).toLocaleDateString()}
                  </small>
                )}

                {/* ===== STATUS BADGE (HERE) ===== */}
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    background:
                      status === "Graded"
                        ? "#bbf7d0"
                        : status === "Submitted"
                        ? "#fde68a"
                        : "#fecaca",
                    color:
                      status === "Graded"
                        ? "green"
                        : status === "Submitted"
                        ? "#92400e"
                        : "red"
                  }}
                >
                  {status}
                </span>

                {/* ===== ACTION BUTTONS ===== */}
                {role === "student" && (
                  <Link
                    className="action-btn"
                    to={`/assignments/${a._id}/submit`}
                  >
                    Submit
                  </Link>
                )}

                {role === "teacher" && (
                  <Link
                    className="action-btn secondary"
                    to={`/assignments/${a._id}/submissions`}
                  >
                    View Submissions
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ===== STYLES ===== */
const styles = {
  card: {
    padding: 15,
    marginBottom: 14,
    background: "#e0f2fe",
    borderRadius: 10,
    borderLeft: "5px solid #f4631e"
  },
  meta: {
    display: "flex",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap"
  }
};
