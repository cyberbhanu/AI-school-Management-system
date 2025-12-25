const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: String,
  marks: Number,
  status: {
    type: String,
    enum: ["Submitted", "Graded"],
    default: "Submitted"
  }
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  dueDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  submissions: [submissionSchema]
});

module.exports = mongoose.model("Assignment", assignmentSchema);
