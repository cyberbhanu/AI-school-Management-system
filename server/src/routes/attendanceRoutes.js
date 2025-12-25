const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

/* =====================================
   MARK ATTENDANCE (Teacher)
===================================== */
router.post("/", auth(["teacher"]), async (req, res) => {
  const { classId, date, records } = req.body;

  if (!classId || !date || !records || records.length === 0) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    // Remove previous attendance for same class & date
    await Attendance.deleteMany({ classId, date });

    const data = records.map((r) => ({
      classId,
      studentId: r.studentId,
      date,
      status: r.status
    }));

    await Attendance.insertMany(data);
    res.json({ message: "Attendance saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================
   VIEW ATTENDANCE
===================================== */
router.get("/", auth(["admin", "teacher", "student"]), async (req, res) => {
  const { classId, studentId } = req.query;

  const filter = {};
  if (classId) filter.classId = classId;
  if (studentId) filter.studentId = studentId;

  try {
    const data = await Attendance.find(filter)
      .populate("studentId", "name email")
      .populate("classId", "name");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================
   ATTENDANCE PERCENTAGE (Student)
===================================== */
router.get("/percentage", auth(["student"]), async (req, res) => {
  const studentId = req.user.id;

  const total = await Attendance.countDocuments({ studentId });
  const present = await Attendance.countDocuments({
    studentId,
    status: "Present"
  });

  const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);

  res.json({ total, present, percentage });
});

module.exports = router;
