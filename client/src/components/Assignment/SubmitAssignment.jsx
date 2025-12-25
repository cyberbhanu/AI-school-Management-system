import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function SubmitAssignment() {
  const { assignmentId } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    await API.post(`/submissions/${assignmentId}`, formData);
    alert("Assignment submitted");
    navigate("/assignments");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 30 }}>
        <h2>📤 Submit Assignment</h2>

        <form onSubmit={submit}>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br /><br />
          <button className="primary-btn">Submit</button>
        </form>
      </div>
    </>
  );
}
