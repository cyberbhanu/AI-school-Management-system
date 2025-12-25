import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    API.get(`/submissions/${assignmentId}`).then(res =>
      setSubs(res.data)
    );
  }, []);

  const grade = async (id, marks, feedback) => {
    await API.put(`/submissions/${id}/grade`, { marks, feedback });
    alert("Graded successfully");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 30 }}>
        <h2>📊 Submissions</h2>

        {subs.map(s => (
          <div key={s._id} style={styles.card}>
            <strong>{s.studentId.name}</strong>

            <a
              href={`http://localhost:5000${s.fileUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              Download File
            </a>

            <input placeholder="Marks" id={`m-${s._id}`} />
            <textarea placeholder="Feedback" id={`f-${s._id}`} />

            <button
              onClick={() =>
                grade(
                  s._id,
                  document.getElementById(`m-${s._id}`).value,
                  document.getElementById(`f-${s._id}`).value
                )
              }
            >
              Grade
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  card: {
    background: "#e0f2fe",
    padding: 15,
    marginBottom: 12,
    borderRadius: 8
  }
};
