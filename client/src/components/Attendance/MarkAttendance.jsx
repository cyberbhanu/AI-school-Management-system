import React, { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../Layout/Navbar";

export default function MarkAttendance() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  /* LOAD CLASSES */
  useEffect(() => {
    API.get("/classes")
      .then(res => setClasses(res.data))
      .catch(() => alert("Failed to load classes"));
  }, []);

  /* LOAD STUDENTS */
  const loadStudents = async (cid) => {
    setClassId(cid);
    setStudents([]);
    setRecords([]);

    if (!cid) return;

    try {
      const res = await API.get(`/users?role=student&classId=${cid}`);

      setStudents(res.data);

      setRecords(
        res.data.map(s => ({
          studentId: s._id,
          status: "Present"
        }))
      );
    } catch {
      alert("Failed to load students");
    }
  };

  /* SAVE */
  const submit = async () => {
    if (!classId || !date || records.length === 0) {
      return alert("Please complete all fields");
    }

    setLoading(true);

    try {
      await API.post("/attendance", { classId, date, records });
      alert("✅ Attendance saved");
    } catch {
      alert("❌ Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>📋 Mark Attendance</h2>

        <select onChange={(e) => loadStudents(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input type="date" onChange={(e) => setDate(e.target.value)} />

        {students.map((s, i) => (
          <div key={s._id} style={styles.row}>
            <span>{s.name}</span>
            <select
              value={records[i]?.status}
              onChange={(e) =>
                setRecords(prev =>
                  prev.map((r, idx) =>
                    idx === i ? { ...r, status: e.target.value } : r
                  )
                )
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        ))}

        <button className="primary-btn" onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  }
};
