import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Assessment.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

/* ================= MONTHLY PKT QUESTIONS ================= */

const monthlyPktQuestions: Question[] = [
  {
    id: 1,
    question: "What is the purpose of Monthly PKT?",
    options: [
      "Improve product knowledge",
      "Entertainment",
      "Sales report",
      "Marketing plan",
    ],
    correctAnswer: "Improve product knowledge",
  },
  {
    id: 2,
    question: "PKT stands for?",
    options: [
      "Product Knowledge Training",
      "Public Knowledge Training",
      "Professional Knowledge Test",
      "Product Key Technology",
    ],
    correctAnswer: "Product Knowledge Training",
  },
  {
    id: 3,
    question: "Monthly PKT helps agents to?",
    options: [
      "Handle customer queries better",
      "Increase salary",
      "Reduce working hours",
      "Skip training",
    ],
    correctAnswer: "Handle customer queries better",
  },
  {
    id: 4,
    question: "PKT sessions are conducted?",
    options: ["Monthly", "Daily", "Weekly", "Yearly"],
    correctAnswer: "Monthly",
  },
  {
    id: 5,
    question: "Which team benefits most from PKT?",
    options: [
      "Customer support team",
      "Finance team",
      "HR team",
      "Security team",
    ],
    correctAnswer: "Customer support team",
  },
];

/* ================= COMPONENT ================= */

const MonthlyPkt: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("email") || "";

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  /* ================= LOGIN CHECK ================= */

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  /* ================= START TIMER ================= */

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  /* ================= SELECT OPTION ================= */

  const handleOptionChange = (questionId: number, option: string) => {
    if (!submitted) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: option,
      }));
    }
  };

  /* ================= SUBMIT ASSESSMENT ================= */

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== monthlyPktQuestions.length) {
      alert("Please answer all questions.");
      return;
    }

    const correctCount = monthlyPktQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const calculatedScore = Math.round(
      (correctCount / monthlyPktQuestions.length) * 100
    );

    setScore(calculatedScore);
    setSubmitted(true);

    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day: 0,
          topic: "MONTHLY_PKT",
          score: calculatedScore,
          duration_seconds: duration,
        }),
      });
    } catch (error) {
      console.error("Error saving Monthly PKT:", error);
    }

    /* ================= SAVE COMPLETION ================= */

    if (calculatedScore >= 80) {
      const key = `${currentUser}_monthly_pkt_completed`;
      localStorage.setItem(key, "true");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="assessment-container">
      <h1>Monthly PKT Assessment</h1>

      {!submitted &&
        monthlyPktQuestions.map((q) => (
          <div key={q.id} className="question-box">
            <h3>
              {q.id}. {q.question}
            </h3>

            {q.options.map((option) => (
              <label key={option} className="option-label">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleOptionChange(q.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Assessment
        </button>
      )}

      {submitted && score !== null && (
        <div className="result-box">
          <h2>Your Score: {score}%</h2>

          {score >= 80 ? (
            <h3 style={{ color: "green" }}>🎉 Passed!</h3>
          ) : (
            <h3 style={{ color: "red" }}>❌ Failed</h3>
          )}

          <button
            className="next-btn"
            onClick={() => navigate("/home")}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyPkt;