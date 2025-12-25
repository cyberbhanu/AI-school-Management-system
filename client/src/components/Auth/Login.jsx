import React, { useState } from "react";
import API from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const role = res.data.user.role;
      if (role === "student") window.location.href = "/student";
      if (role === "teacher") window.location.href = "/teacher";
      if (role === "admin") window.location.href = "/admin";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h3>Login</h3>

        <form onSubmit={submit}>
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
         <p>
  <a href="/forgot-password">Forgot Password?</a>
</p>

          <button className="primary-btn">Login</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
