const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");

router.get("/", auth(["admin", "teacher", "student"]), async (req, res) => {
  try {
    const stats = {};

    // ===== ADMIN STATS =====
    if (req.user.role === "admin") {
      stats.totalUsers = await User.countDocuments();
      stats.totalTeachers = await User.countDocuments({ role: "teacher" });
      stats.totalStudents = await User.countDocuments({ role: "student" });
      stats.totalClasses = await Class.countDocuments();
    }

    // ===== TEACHER STATS =====
    if (req.user.role === "teacher" || req.user.role === "admin") {
      stats.totalTeachers = await User.countDocuments({ role: "teacher" });
      stats.assignments = await Assignment.countDocuments();
    }

    // ===== STUDENT STATS =====
    if (req.user.role === "student" || req.user.role === "teacher" || req.user.role === "admin") {
      stats.totalStudents = await User.countDocuments({ role: "student" });
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
