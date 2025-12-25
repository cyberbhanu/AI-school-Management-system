const mongoose = require("mongoose");

const AssignmentSubmissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    default: null
  },
  feedback: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["Submitted", "Graded"],
    default: "Submitted"
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);
