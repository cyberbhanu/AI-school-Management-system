import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function ViewAttendance() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/attendance").then(res => setData(res.data));

    if (user?.role === "student") {
      API.get("/attendance/percentage")
        .then(res => setSummary(res.data));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>📊 Attendance</h2>

        {summary && (
          <p>
            Attendance: <strong>{summary.percentage}%</strong>
          </p>
        )}

        {data.map(a => (
          <div key={a._id} style={styles.card}>
            <strong>{a.studentId.name}</strong> |
            {a.classId.name} |
            {a.date}
            <span style={{
              marginLeft: 10,
              color: a.status === "Present" ? "green" : "red"
            }}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  card: {
    padding: 10,
    background: "#e0f2fe",
    marginBottom: 8,
    borderRadius: 6
  }
};
