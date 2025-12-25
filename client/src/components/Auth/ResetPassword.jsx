import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      setMsg("Password updated successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Invalid or expired link");
    }
  };

  return (
    <div className="auth-card">
      <h3>Reset Password</h3>

      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="primary-btn">Reset Password</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
