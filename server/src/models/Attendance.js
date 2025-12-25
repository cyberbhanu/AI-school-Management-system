const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String, // yyyy-mm-dd
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
