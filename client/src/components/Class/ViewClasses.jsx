import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    API.get("/classes").then((res) => setClasses(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>📚 All Classes</h2>

        {classes.map((c) => (
          <div key={c._id} className="card">
            <h3>{c.name}</h3>
            <p>Subject: {c.subject}</p>
            <p>
              Teacher: {c.teacher ? c.teacher.name : "Not Assigned"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
