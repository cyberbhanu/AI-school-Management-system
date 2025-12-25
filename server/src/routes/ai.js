const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const knowledgeBase = require("../utils/knowledgeBase");

router.post("/doubt", auth(["student", "teacher", "admin"]), async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  const q = question.toLowerCase().trim();

  // ✅ FIRST: Local guaranteed answer
  for (const key in knowledgeBase) {
    if (q.includes(key)) {
      return res.json({ answer: knowledgeBase[key] });
    }
  }

  // 🟡 FALLBACK (AI placeholder)
  return res.json({
    answer:
      "This question is outside the predefined knowledge base. Please ask a DBMS, SDLC, Testing, or Networking related question."
  });
});

module.exports = router;
