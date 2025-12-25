import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [msg, setMsg] = useState("");

  /* ===============================
     LOAD CLASSES (for students)
  =============================== */
  useEffect(() => {
    API.get("/classes")
      .then((res) => setClasses(res.data))
      .catch(() => console.log("Failed to load classes"));
  }, []);

  /* ===============================
     SUBMIT USER
  =============================== */
  const submit = async (e) => {
    e.preventDefault();

    if (role === "student" && !classId) {
      setMsg("❌ Please select class for student");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        classId: role === "student" ? classId : null
      });

      setMsg(`✅ ${role} added successfully`);

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
      setClassId("");
    } catch (err) {
      setMsg(
        err.response?.data?.message || "❌ Error adding user"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>➕ Add User</h2>

        <form onSubmit={submit} style={{ maxWidth: 420 }}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          {/* CLASS (ONLY FOR STUDENT) */}
          {role === "student" && (
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          <button className="primary-btn">Add User</button>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </form>
      </div>
    </>
  );
}
