import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function AddAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classId, setClassId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]); // ✅ NEW
  const [msg, setMsg] = useState("");

  /* ================= LOAD CLASSES ================= */
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await API.get("/classes");
        setClasses(res.data || []);
      } catch {
        console.error("Failed to load classes");
      }
    };
    loadClasses();
  }, []);

  /* ================= LOAD ASSIGNMENTS ================= */
  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments");
      setAssignments(res.data || []);
    } catch {
      console.error("Failed to load assignments");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    if (!classId) {
      alert("Please select a class");
      return;
    }

    try {
      await API.post("/assignments", {
        title,
        description,
        classId,
        dueDate
      });

      setMsg("✅ Assignment added successfully");

      // RESET FORM
      setTitle("");
      setDescription("");
      setClassId("");
      setDueDate("");

      // 🔥 REFRESH LIST
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add assignment");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* ================= FORM ================= */}
        <div style={styles.card}>
          <h2 style={styles.heading}>📘 Create Assignment</h2>

          <form onSubmit={submit} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Assignment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              style={styles.textarea}
              placeholder="Assignment Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              style={styles.input}
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>

            <input
              style={styles.input}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <button style={styles.button}>➕ Add Assignment</button>

            {msg && <p style={styles.success}>{msg}</p>}
          </form>
        </div>

        {/* ================= ASSIGNMENT LIST ================= */}
        <div style={styles.listCard}>
          <h3 style={{ marginBottom: 10 }}>📂 Added Assignments</h3>

          {assignments.length === 0 && (
            <p style={{ color: "#64748b" }}>No assignments yet</p>
          )}

          {assignments.map((a) => (
            <div key={a._id} style={styles.assignment}>
              <h4>{a.title}</h4>
              <p>{a.description}</p>
              <small>
                📅 Due: {new Date(a.dueDate).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    gap: 30,
    justifyContent: "center",
    padding: 40,
    background: "#f8fafc",
    flexWrap: "wrap"
  },
  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },
  listCard: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },
  heading: {
    textAlign: "center",
    marginBottom: 20
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #cbd5e1"
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    resize: "none"
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#f4631e",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },
  success: {
    textAlign: "center",
    color: "green",
    fontWeight: 600
  },
  assignment: {
    padding: 12,
    borderRadius: 10,
    background: "#e0f2fe",
    marginBottom: 12
  }
};
