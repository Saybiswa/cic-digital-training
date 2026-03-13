import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Assessment.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface AssessmentLocationState {
  totalTopics: number;
}

/* ================= QUESTION BANK ================= */

const topicQuestionBank: Record<string, Question[]> = {
  "LG-HISTORY": [
    {
      id: 1,
      question: "When was LG founded?",
      options: ["1947", "1958", "1965", "1972"],
      correctAnswer: "1958",
    },
    {
      id: 2,
      question: "LG originally stood for?",
      options: ["Life Good", "Lucky Goldstar", "Light Group", "Logic Group"],
      correctAnswer: "Lucky Goldstar",
    },
    {
      id: 3,
      question: "LG headquarters is located in?",
      options: ["India", "USA", "South Korea", "Japan"],
      correctAnswer: "South Korea",
    },
    {
      id: 4,
      question: "LG produces?",
      options: ["Electronics", "Appliances", "Mobile phones", "All of these"],
      correctAnswer: "All of these",
    },
    {
      id: 5,
      question: "LG slogan is?",
      options: ["Life's Good", "Think Big", "Just Do It", "Power Your Life"],
      correctAnswer: "Life's Good",
    },
  ],

  "DEPARTMENT-OVERVIEW": [
    {
      id: 1,
      question: "Departments help in?",
      options: ["Work organization", "Efficiency", "Responsibility division", "All"],
      correctAnswer: "All",
    },
    {
      id: 2,
      question: "Customer issues are handled by?",
      options: ["Finance", "Customer Service", "IT", "Marketing"],
      correctAnswer: "Customer Service",
    },
    {
      id: 3,
      question: "which will be the customer service specializations?",
      options: ["Contact center", "Capability Department", "Buisness Management", "All"],
      correctAnswer: "All",
    },
    {
      id: 4,
      question: "Customer serice strategy department divided in how may parts?",
      options: ["4", "2", "3", "none of the above"],
      correctAnswer: "3",
    },
    {
      id: 5,
      question: "CS Buisness management focusing on which services?",
      options: ["AMC", "Cost Management", "E-Waste Management", "All"],
      correctAnswer: "All",
    },
  ],

  "CS-INTRO": [
    {
      id: 1,
      question: "what will be the customers inquery?",
      options: ["Pre-sale", "Installation", "Product Price", "None of the above"],
      correctAnswer: "Pre-sale",
    },
    {
      id: 2,
      question: "Customer service focuses on?",
      options: ["Customer satisfaction", "Sales", "Marketing", "Manufacturing"],
      correctAnswer: "Customer satisfaction",
    },
    {
      id: 3,
      question: "Good customer service builds?",
      options: ["Trust", "Loyalty", "Brand image", "All"],
      correctAnswer: "All",
    },
    {
      id: 4,
      question: "Customer complaints should be?",
      options: ["Ignored", "Resolved quickly", "Delayed", "Closed"],
      correctAnswer: "Resolved quickly",
    },
    {
      id: 5,
      question: "CS agents should be?",
      options: ["Polite", "Helpful", "Patient", "All"],
      correctAnswer: "All",
    },
  ],

  "CIC-INTRODUCTION": [
    {
      id: 1,
      question: "CIC stands for?",
      options: [
        "Customer Interaction Center",
        "Central Information Cell",
        "Customer Integration Channel",
        "Call Interaction Center",
      ],
      correctAnswer: "Customer Interaction Center",
    },
    {
      id: 2,
      question: "CIC handles?",
      options: ["Customer queries", "Complaints", "Service requests", "All"],
      correctAnswer: "All",
    },
    {
      id: 3,
      question: "CIC improves?",
      options: ["Customer experience", "Response time", "Service quality", "All"],
      correctAnswer: "All",
    },
    {
      id: 4,
      question: "CIC mainly interacts with?",
      options: ["Customers", "Employees", "Vendors", "Managers"],
      correctAnswer: "Customers",
    },
    {
      id: 5,
      question: "CIC uses tools like?",
      options: ["CRM", "Call systems", "Ticket systems", "All"],
      correctAnswer: "All",
    },
  ],
  "GSFS INTRODUCTION": [
{
id: 1,
question: "GSFS stands for?",
options: [
"Global Service Field System",
"General Service Flow System",
"Global Support Field Service",
"General Service Form System"
],
correctAnswer: "Global Service Field System"
},
{
id: 2,
question: "GSFS is mainly used for?",
options: [
"Service management",
"Customer registration",
"Call tracking",
"All of these"
],
correctAnswer: "All of these"
},
{
id: 3,
question: "GSFS helps engineers to?",
options: [
"Track service calls",
"Update service status",
"Close service tickets",
"All of these"
],
correctAnswer: "All of these"
},
{
id: 4,
question: "GSFS is used by?",
options: [
"Service engineers",
"Customer support",
"Managers",
"All"
],
correctAnswer: "All"
},
{
id: 5,
question: "GSFS improves?",
options: [
"Service efficiency",
"Tracking",
"Customer satisfaction",
"All"
],
correctAnswer: "All"
}
],

"FRESH CALL REGISTRATION": [
{
id: 1,
question: "Fresh call registration means?",
options: [
"Registering new service request",
"Closing call",
"Deleting call",
"Updating call"
],
correctAnswer: "Registering new service request"
},
{
id: 2,
question: "Fresh call requires?",
options: [
"Customer details",
"Product details",
"Complaint details",
"All"
],
correctAnswer: "All"
},
{
id: 3,
question: "Fresh call is created when?",
options: [
"Customer reports issue",
"Engineer visits",
"Product sold",
"Warranty ends"
],
correctAnswer: "Customer reports issue"
},
{
id: 4,
question: "Fresh call ensures?",
options: [
"Service tracking",
"Complaint record",
"Customer support",
"All"
],
correctAnswer: "All"
},
{
id: 5,
question: "Fresh call is handled by?",
options: [
"CIC agent",
"Engineer",
"Manager",
"None"
],
correctAnswer: "CIC agent"
}
],

"GSFS EXPLANATION CNP": [
{
id: 1,
question: "CNP stands for?",
options: [
"Call Not Processed",
"Customer Not Present",
"Call Not Possible",
"Customer Not Paid"
],
correctAnswer: "Customer Not Present"
},
{
id: 2,
question: "CNP status means?",
options: [
"Customer unavailable",
"Call completed",
"Call closed",
"Call rejected"
],
correctAnswer: "Customer unavailable"
},
{
id: 3,
question: "CNP occurs when?",
options: [
"Customer not at home",
"Customer phone unreachable",
"Customer reschedules",
"All"
],
correctAnswer: "All"
},
{
id: 4,
question: "Engineer should update CNP in?",
options: [
"GSFS",
"CRM",
"Excel",
"Email"
],
correctAnswer: "GSFS"
},
{
id: 5,
question: "CNP helps to?",
options: [
"Track visit attempts",
"Update status",
"Maintain records",
"All"
],
correctAnswer: "All"
}
],

"CALL RE-REGISTRATION": [
{
id: 1,
question: "Call re-registration means?",
options: [
"Reopening previous call",
"Deleting call",
"New call",
"Cancel call"
],
correctAnswer: "Reopening previous call"
},
{
id: 2,
question: "Call re-registration happens when?",
options: [
"Issue not solved",
"Customer requests again",
"Service incomplete",
"All"
],
correctAnswer: "All"
},
{
id: 3,
question: "Re-registration ensures?",
options: [
"Customer satisfaction",
"Service continuity",
"Tracking",
"All"
],
correctAnswer: "All"
},
{
id: 4,
question: "Call re-registration recorded in?",
options: [
"GSFS",
"Manual register",
"Email",
"Excel"
],
correctAnswer: "GSFS"
},
{
id: 5,
question: "Re-registration helps to?",
options: [
"Track repeated issues",
"Improve service",
"Customer support",
"All"
],
correctAnswer: "All"
}
],

"ONEWIEW": [
{
id: 1,
question: "OneView is used for?",
options: [
"Customer data view",
"Service history",
"Product details",
"All"
],
correctAnswer: "All"
},
{
id: 2,
question: "OneView provides?",
options: [
"Customer profile",
"Complaint history",
"Service details",
"All"
],
correctAnswer: "All"
},
{
id: 3,
question: "OneView helps agent to?",
options: [
"Understand customer issue",
"Check history",
"Provide faster service",
"All"
],
correctAnswer: "All"
},
{
id: 4,
question: "OneView integrates?",
options: [
"Customer data",
"Service records",
"Product information",
"All"
],
correctAnswer: "All"
},
{
id: 5,
question: "OneView improves?",
options: [
"Customer support",
"Efficiency",
"Service quality",
"All"
],
correctAnswer: "All"
}
],

"REMINDER GENERATION": [
{
id: 1,
question: "Reminder generation is used for?",
options: [
"Follow-up service",
"Customer reminder",
"Engineer visit reminder",
"All"
],
correctAnswer: "All"
},
{
id: 2,
question: "Reminder helps to?",
options: [
"Avoid delay",
"Track service",
"Improve response",
"All"
],
correctAnswer: "All"
},
{
id: 3,
question: "Reminder is created when?",
options: [
"Call pending",
"Service delayed",
"Customer follow-up",
"All"
],
correctAnswer: "All"
},
{
id: 4,
question: "Reminder ensures?",
options: [
"Timely service",
"Tracking",
"Customer satisfaction",
"All"
],
correctAnswer: "All"
},
{
id: 5,
question: "Reminder is updated in?",
options: [
"GSFS",
"CRM",
"Excel",
"Email"
],
correctAnswer: "GSFS"
}
],

"VOC": [
{
id: 1,
question: "VOC stands for?",
options: [
"Voice of Customer",
"Value of Customer",
"Volume of Calls",
"View of Customer"
],
correctAnswer: "Voice of Customer"
},
{
id: 2,
question: "VOC collects?",
options: [
"Customer feedback",
"Complaints",
"Suggestions",
"All"
],
correctAnswer: "All"
},
{
id: 3,
question: "VOC helps company to?",
options: [
"Improve service",
"Understand customers",
"Improve product",
"All"
],
correctAnswer: "All"
},
{
id: 4,
question: "VOC data used for?",
options: [
"Service improvement",
"Customer satisfaction",
"Business growth",
"All"
],
correctAnswer: "All"
},
{
id: 5,
question: "VOC feedback comes from?",
options: [
"Customers",
"Surveys",
"Service interactions",
"All"
],
correctAnswer: "All"
}
],
};

/* ================= COMPONENT ================= */

const Assessment: React.FC = () => {
  const { dayId, topicId } = useParams<{ dayId?: string; topicId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as AssessmentLocationState | null;

  const currentUser = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token");

  const totalTopics = state?.totalTopics ?? 1;

  const correctedDay = Number(dayId);
  const decodedTopic = topicId ? decodeURIComponent(topicId) : "";

  const questions: Question[] = topicQuestionBank[decodedTopic] || [];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  /* ================= LOGIN CHECK ================= */

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  /* ================= TIMER ================= */

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  /* ================= OPTION SELECT ================= */

  const handleOptionChange = (questionId: number, option: string) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    const correctCount = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const calculatedScore = Math.round(
      (correctCount / questions.length) * 100
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
          day: correctedDay,
          topic: decodedTopic,
          score: calculatedScore,
          duration_seconds: duration,
        }),
      });
    } catch (error) {
      console.error("Error saving assessment:", error);
    }

    /* ================= TOPIC COMPLETION ================= */

    if (calculatedScore >= 80) {
      const topicKey = `${currentUser}_day${correctedDay}_topic${decodedTopic}_completed`;
      const topicCountKey = `${currentUser}_day${correctedDay}_topics_completed_count`;
      const dayCompletedKey = `${currentUser}_day${correctedDay}_completed`;

      if (!localStorage.getItem(topicKey)) {
        localStorage.setItem(topicKey, "true");

        const currentCount = Number(localStorage.getItem(topicCountKey) || 0);
        const newCount = currentCount + 1;

        localStorage.setItem(topicCountKey, newCount.toString());

        if (newCount >= totalTopics) {
          localStorage.setItem(dayCompletedKey, "true");
          alert("🏆 Day Completed Successfully!");
        }
      }
    }
  };

  /* ================= NO QUESTIONS ================= */

  if (questions.length === 0) {
    return (
      <div className="assessment-container">
        <h2>No assessment available for this topic.</h2>
        <button onClick={() => navigate(`/new-hired/${correctedDay}`)}>
          Back
        </button>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="assessment-container">
      <h1>
        Day {correctedDay} Assessment
        <br />
        <span>{decodedTopic}</span>
      </h1>

      {!submitted &&
        questions.map((q) => (
          <div key={q.id} className="question-box">
            <h3>{q.id}. {q.question}</h3>

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
            <h3 style={{ color: "green" }}>🎉 Topic Passed!</h3>
          ) : (
            <h3 style={{ color: "red" }}>❌ You did not pass</h3>
          )}

          <button onClick={() => navigate(`/new-hired/${correctedDay}`)}>
            Back to Topics
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;