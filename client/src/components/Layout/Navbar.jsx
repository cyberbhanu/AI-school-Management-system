import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let dashboardPath = "/";

  if (token) {
    const role = jwtDecode(token).user.role;
    if (role === "student") dashboardPath = "/student";
    if (role === "teacher") dashboardPath = "/teacher";
    if (role === "admin") dashboardPath = "/admin";
  }

  return (
    <div className="navbar">
      <h3>AI School</h3>

      <div>
        <Link to={dashboardPath}>Dashboard</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/attendance">Attendance</Link>

        <button
          className="action-btn danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
