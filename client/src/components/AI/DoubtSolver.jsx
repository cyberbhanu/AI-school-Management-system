import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import API from "../../api/api";

export default function DoubtSolver() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const res = await API.post("/ai/doubt", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      alert("AI failed to respond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>🤖 AI Doubt Solver</h2>

        <textarea
          placeholder="Ask your academic doubt..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.textarea}
        />

        <button
          className="primary-btn"
          onClick={askAI}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div style={styles.answerBox}>
            <h4>AI Answer:</h4>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 700,
    margin: "auto"
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8
  },
  answerBox: {
    marginTop: 20,
    padding: 16,
    background: "#e0f2fe",
    borderRadius: 8
  }
};
