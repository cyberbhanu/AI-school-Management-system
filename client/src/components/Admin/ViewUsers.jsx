import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      }
    };
    loadUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>👥 All Users</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {users.length === 0 && !error && <p>No users found</p>}

        {users.map((u) => (
          <div key={u._id} style={styles.card}>
            <strong>{u.name}</strong> <br />
            {u.email} <br />
            <b>{u.role}</b>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  card: {
    padding: 12,
    background: "#e0f2fe",
    marginBottom: 8,
    borderRadius: 6
  }
};
