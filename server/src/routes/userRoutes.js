const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

/* =====================================================
   GET USERS (Admin / Teacher)
   - admin → can see everyone
   - teacher → can see students & teachers
   - supports role & classId filters
===================================================== */
router.get("/", auth(["admin", "teacher"]), async (req, res) => {
  const { role, classId } = req.query;

  const filter = {};

  // Filter by role (admin / teacher / student)
  if (role) filter.role = role;

  // Filter by class (ONLY for students)
  if (classId) filter.classId = classId;

  try {
    const users = await User.find(filter)
      .select("-password")
      .populate("classId", "name");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
