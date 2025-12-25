import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // 2️⃣ Decode token
    const decoded = jwtDecode(token);
    const userRole = decoded.user.role;

    // 3️⃣ Role not allowed
    if (roles && !roles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }

    // 4️⃣ Access granted
    return children;
  } catch (err) {
    // Invalid / expired token
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
}
