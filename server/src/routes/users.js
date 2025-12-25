const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

/* =====================================================
   GET USERS
   - Admin: sees all users
   - Teacher: sees students only
===================================================== */
router.get("/", auth(["admin", "teacher"]), async (req, res) => {
  try {
    let filter = {};

    // Teacher can only see students
    if (req.user.role === "teacher") {
      filter.role = "student";
    }

    const users = await User.find(filter).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
