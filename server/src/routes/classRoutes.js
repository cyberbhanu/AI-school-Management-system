const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const auth = require("../middleware/auth");

/* ============================
   ADD CLASS (Admin / Teacher)
============================ */
router.post("/", auth(["admin", "teacher"]), async (req, res) => {
  const { name, subject, teacher } = req.body;

  if (!name || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newClass = await Class.create({
      name,
      subject,
      teacher
    });

    res.json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ============================
   GET ALL CLASSES
============================ */
router.get("/", auth(["admin", "teacher", "student"]), async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacher", "name email");

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
