const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

/* CREATE ASSIGNMENT */
router.post("/", auth(["teacher"]), async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.json(assignment);
});

/* GET ASSIGNMENTS */
router.get("/", auth(["student", "teacher"]), async (req, res) => {
  const filter = req.query.classId ? { classId: req.query.classId } : {};
  const assignments = await Assignment.find(filter);
  res.json(assignments);
});

/* STUDENT SUBMIT ASSIGNMENT */
router.post(
  "/:id/submit",
  auth(["student"]),
  upload.single("file"),
  async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);

    assignment.submissions.push({
      studentId: req.user.id,
      file: req.file.filename
    });

    await assignment.save();
    res.json({ message: "Assignment submitted" });
  }
);

/* TEACHER GRADE */
router.post(
  "/:id/grade",
  auth(["teacher"]),
  async (req, res) => {
    const { studentId, marks } = req.body;

    const assignment = await Assignment.findById(req.params.id);
    const submission = assignment.submissions.find(
      s => s.studentId.toString() === studentId
    );

    submission.marks = marks;
    submission.status = "Graded";

    await assignment.save();
    res.json({ message: "Graded successfully" });
  }
);

module.exports = router;
