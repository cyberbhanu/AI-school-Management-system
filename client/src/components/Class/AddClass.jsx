import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function AddClass() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/classes", { name, subject });
      setMsg("✅ Class added successfully");
      setName("");
      setSubject("");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Error adding class");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Add Class</h2>

        <form onSubmit={submit} style={{ maxWidth: 400 }}>
          <input
            placeholder="Class Name (e.g. 10-A)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Subject (e.g. Science)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <button className="primary-btn">Add Class</button>
          <p>{msg}</p>
        </form>
      </div>
    </>
  );
}
