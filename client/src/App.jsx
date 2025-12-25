import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitAssignment from "./components/Assignment/SubmitAssignment";
import AssignmentSubmissions from "./components/Assignment/AssignmentSubmissions";

import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import AdminDashboard from "./components/Dashboard/AdminDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import StudentDashboard from "./components/Dashboard/StudentDashboard";

import ViewClasses from "./components/Class/ViewClasses";
import AddClass from "./components/Class/AddClass";

import ViewAssignments from "./components/Assignment/ViewAssignments";
import AddAssignment from "./components/Assignment/AddAssignment";

import ViewAttendance from "./components/Attendance/ViewAttendance";
import MarkAttendance from "./components/Attendance/MarkAttendance";

import ViewUsers from "./components/Admin/ViewUsers";
import AddUser from "./components/Admin/AddUser";

import DoubtSolver from "./components/AI/DoubtSolver";

import TeacherLiveClass from "./components/LiveClass/TeacherLiveClass";
import StudentLiveClass from "./components/LiveClass/StudentLiveClass";

import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import School from "./components/Home/School";
import TeacherInfo from "./components/Home/TeacherInfo";
import StudentInfo from "./components/Home/StudentInfo";


export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* DASHBOARDS */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>
        } />

        <Route path="/teacher" element={
          <ProtectedRoute roles={["teacher"]}><TeacherDashboard /></ProtectedRoute>
        } />

        <Route path="/student" element={
          <ProtectedRoute roles={["student"]}><StudentDashboard /></ProtectedRoute>
        } />

        {/* COMMON */}
        <Route path="/classes" element={
          <ProtectedRoute roles={["admin","teacher","student"]}><ViewClasses /></ProtectedRoute>
        } />

        <Route path="/assignments" element={
          <ProtectedRoute roles={["admin","teacher","student"]}><ViewAssignments /></ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute roles={["admin","teacher","student"]}><ViewAttendance /></ProtectedRoute>
        } />

        <Route path="/doubt" element={
          <ProtectedRoute roles={["admin","teacher","student"]}><DoubtSolver /></ProtectedRoute>
        } />

        {/* TEACHER */}
        <Route path="/add-class" element={
          <ProtectedRoute roles={["admin","teacher"]}><AddClass /></ProtectedRoute>
        } />

        <Route path="/add-assignment" element={
          <ProtectedRoute roles={["teacher"]}><AddAssignment /></ProtectedRoute>
        } />

        <Route path="/mark-attendance" element={
          <ProtectedRoute roles={["teacher"]}><MarkAttendance /></ProtectedRoute>
        } />

        {/* ADMIN */}
        <Route path="/users" element={
          <ProtectedRoute roles={["admin"]}><ViewUsers /></ProtectedRoute>
        } />

        <Route path="/add-user" element={
          <ProtectedRoute roles={["admin"]}><AddUser /></ProtectedRoute>
        } />

        {/* LIVE CLASS */}
        <Route path="/teacher/live" element={
          <ProtectedRoute roles={["teacher"]}><TeacherLiveClass /></ProtectedRoute>
        } />

        <Route path="/student/live" element={
          <ProtectedRoute roles={["student"]}><StudentLiveClass /></ProtectedRoute>
        } />
         <Route
  path="/assignments/:assignmentId/submit"
  element={
    <ProtectedRoute roles={["student"]}>
      <SubmitAssignment />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignments/:assignmentId/submissions"
  element={
    <ProtectedRoute roles={["teacher"]}>
      <AssignmentSubmissions />
    </ProtectedRoute>
  }
/>
{/* PUBLIC INFO PAGES */}
<Route path="/school" element={<School />} />
<Route path="/teacher-info" element={<TeacherInfo />} />
<Route path="/student-info" element={<StudentInfo />} />



      </Routes>
    </Router>
  );
}
