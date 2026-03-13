import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Assessment.css";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const monthlyPktQuestions: Question[] = [
  {
    question: "What is the purpose of Monthly PKT?",
    options: [
      "Improve product knowledge",
      "Entertainment",
      "Sales report",
      "Marketing plan",
    ],
    answer: "Improve product knowledge",
  },
  {
    question: "PKT stands for?",
    options: [
      "Product Knowledge Training",
      "Public Knowledge Training",
      "Professional Knowledge Test",
      "Product Key Technology",
    ],
    answer: "Product Knowledge Training",
  },
  {
    question: "Monthly PKT helps agents to?",
    options: [
      "Handle customer queries better",
      "Increase salary",
      "Reduce working hours",
      "Skip training",
    ],
    answer: "Handle customer queries better",
  },
  {
    question: "PKT sessions are conducted?",
    options: ["Monthly", "Daily", "Weekly", "Yearly"],
    answer: "Monthly",
  },
  {
    question: "Which team benefits most from PKT?",
    options: [
      "Customer support team",
      "Finance team",
      "HR team",
      "Security team",
    ],
    answer: "Customer support team",
  },
];

function MonthlyPkt() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("email");

  const [answers, setAnswers] = useState<string[]>(
    Array(monthlyPktQuestions.length).fill("")
  );

  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleOptionChange = (qIndex: number, option: string) => {
    const updated = [...answers];
    updated[qIndex] = option;
    setAnswers(updated);
  };

  const saveAssessment = async (percentage: number, duration: number) => {
    try {
      await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: currentUser,
          day: 0,
          topic: "MONTHLY_PKT",
          score: percentage,
          duration_seconds: duration,
        }),
      });

      console.log("Monthly PKT saved");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const submitAssessment = async () => {
    if (answers.includes("")) {
      alert("Please answer all questions.");
      return;
    }

    let correct = 0;

    monthlyPktQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });

    const percentage = Math.round(
      (correct / monthlyPktQuestions.length) * 100
    );

    setScore(percentage);

    const duration = Math.floor((Date.now() - startTime) / 1000);

    await saveAssessment(percentage, duration);

    if (percentage >= 80) {
      setPassed(true);

      localStorage.setItem(
        `${currentUser}_monthly_pkt_completed`,
        "true"
      );

      alert("Congratulations! You passed Monthly PKT!");
    } else {
      alert("You need 80% to pass.");
    }
  };

  return (
    <div className="assessment-container">
      <h1>Monthly PKT</h1>

      {monthlyPktQuestions.map((q, index) => (
        <div key={index} className="question-box">
          <h3>
            {index + 1}. {q.question}
          </h3>

          {q.options.map((option) => (
            <label key={option} className="option-label">
              <input
                type="radio"
                name={`question-${index}`}
                checked={answers[index] === option}
                onChange={() => handleOptionChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      {score === null && (
        <button className="submit-btn" onClick={submitAssessment}>
          Submit
        </button>
      )}

      {score !== null && (
        <div className="result-box">
          <h2>Your Score: {score}%</h2>

          {passed ? (
            <>
              <h3 style={{ color: "green" }}>Passed</h3>

              <button
                className="next-btn"
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </>
          ) : (
            <>
              <h3 style={{ color: "red" }}>Failed</h3>

              <button
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MonthlyPkt;