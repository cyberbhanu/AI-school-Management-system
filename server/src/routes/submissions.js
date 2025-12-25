const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const Submission = require("../models/AssignmentSubmission");

/* STUDENT SUBMIT */
router.post(
  "/:assignmentId",
  auth(["student"]),
  upload.single("file"),
  async (req, res) => {
    const submission = new Submission({
      assignmentId: req.params.assignmentId,
      studentId: req.user.id,
      fileUrl: `/uploads/${req.file.filename}`
    });

    await submission.save();
    res.json({ message: "Assignment submitted" });
  }
);

/* TEACHER VIEW */
router.get("/:assignmentId", auth(["teacher"]), async (req, res) => {
  const submissions = await Submission.find({
    assignmentId: req.params.assignmentId
  }).populate("studentId", "name email");

  res.json(submissions);
});

/* TEACHER GRADE */
router.put("/:id/grade", auth(["teacher"]), async (req, res) => {
  const { marks, feedback } = req.body;

  const submission = await Submission.findByIdAndUpdate(
    req.params.id,
    { marks, feedback, status: "Graded" },
    { new: true }
  );

  res.json(submission);
});

module.exports = router;
