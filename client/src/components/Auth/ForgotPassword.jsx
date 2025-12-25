import React, { useState } from "react";
import API from "../../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [link, setLink] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message);
      setLink(res.data.resetLink);
    } catch {
      setMsg("User not found");
    }
  };

  return (
    <div className="auth-card">
      <h3>Forgot Password</h3>

      <form onSubmit={submit}>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="primary-btn">Generate Reset Link</button>
      </form>

      {msg && <p>{msg}</p>}
      {link && (
        <p>
          Reset Link: <a href={link}>{link}</a>
        </p>
      )}
    </div>
  );
}
