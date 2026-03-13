import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

type Language =
  | "english"
  | "hindi"
  | "bengali"
  | "marathi"
  | "telugu"
  | "gujarati";

// Days and videos
const trainingDays: Record<Language, { day: string; video: string }[]> = {
  english: [
    { day: "Day 1", video: "/videos/english/new-hired/day1.mp4" },
    { day: "Day 2 GSFS", video: "/videos/english/new-hired/day2.mp4" },
    { day: "Day 3 PRODUCT OVERVIEW", video: "/videos/english/new-hired/day3.mp4" },
  ],
  hindi: [
    { day: "दिन 1", video: "/videos/hindi/new-hired/day1.mp4" },
    { day: "दिन 2 GSFS", video: "/videos/hindi/new-hired/day2.mp4" },
    { day: "दिन 3 प्रोडक्ट ओवरव्यू ", video: "/videos/hindi/new-hired/day3.mp4" },
  ],
  bengali: [
    { day: "দিন ১", video: "/videos/bengali/new-hired/day1.mp4" },
    { day: "দিন ২ GSFS", video: "/videos/bengali/new-hired/day2.mp4" },
    { day: "দিন ৩ প্রোডাক্ট ওভারভিউ", video: "/videos/bengali/new-hired/day3.mp4" },
  ],
  marathi: [
    { day: "दिवस 1", video: "/videos/marathi/new-hired/day1.mp4" },
    { day: "दिवस 2 GSFS", video: "/videos/marathi/new-hired/day2.mp4" },
    { day: "दिवस 3 उत्पादन ओव्हरव्ह्यू", video: "/videos/marathi/new-hired/day3.mp4" },
  ],
  telugu: [
    { day: "రోజు 1", video: "/videos/telugu/new-hired/day1.mp4" },
    { day: "రోజు 2 GSFS", video: "/videos/telugu/new-hired/day2.mp4" },
    { day: "రోజు 3 ఉత్పత్తి అవలోకనం", video: "/videos/telugu/new-hired/day3.mp4" },
  ],
  gujarati: [
    { day: "દિવસ 1", video: "/videos/gujarati/new-hired/day1.mp4" },
    { day: "દિવસ 2 GSFS", video: "/videos/gujarati/new-hired/day2.mp4" },
    { day: "દિવસ 3 પ્રોડક્ટ સમીક્ષા", video: "/videos/gujarati/new-hired/day3.mp4" },
  ],
};

function NewHired() {
  const navigate = useNavigate();
  const location = useLocation();

  const language = location.state?.language as Language | undefined;

  // ✅ Safe Redirect
  useEffect(() => {
    if (!language) {
      navigate("/", { replace: true });
    }
  }, [language, navigate]);

  if (!language) return null;

  const days = trainingDays[language];

  return (
    <div className="daypage-container">
    <div className="training-page">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() =>
          navigate("/home", {
            state: { language }, // preserve language
          })
        }
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <h1 className="page-title">New Hired Training Program</h1>
      <p className="page-subtitle">
        Duration: 3 Days | Comprehensive Onboarding Experience
      </p>

      <div className="modules-container">
        {days.map((dayObj, idx) => (
          <div
            key={idx}
            className="module-card clickable-topic"
            onClick={() =>
              navigate(`/new-hired/${idx + 1}`, {
                state: {
                  video: dayObj.video,
                  language,
                },
              })
            }
          >
            <h2>{dayObj.day}</h2>
            <span className="watch-label">Click to view topics</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default NewHired;
