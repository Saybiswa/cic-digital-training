import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import "./DayPage.css";

type Language =
  | "english"
  | "hindi"
  | "bengali"
  | "gujarati"
  | "marathi"
  | "telugu";

type DayId = 1 | 2 | 3;

interface Topic {
  id: string;
  label: string;
}
const dayTopics: Record<Language, Record<DayId, Topic[]>> = {
  english: {
    1: [
      { id: "LG-HISTORY", label: "LG-HISTORY" },
      { id: "DEPARTMENT-OVERVIEW", label: "DEPARTMENT-OVERVIEW" },
      { id: "CS-INTRO", label: "CS-INTRO" },
      { id: "CIC-INTRODUCTION", label: "CIC-INTRODUCTION" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS INTRODUCTION" },
      { id: "FRESH CALL REGISTRATION", label: "FRESH CALL REGISTRATION" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS EXPLANATION CNP" },
      { id: "CALL RE-REGISTRATION", label: "CALL RE-REGISTRATION" },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "REMINDER GENERATION" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "usages Extensive of Telepresence" },
      { id: "Assistant Through RST", label: "Assistant Through RST" },
    ],
  },

  hindi: {
    1: [
      { id: "LG-HISTORY", label: "एलजी-हिस्ट्री" },
      { id: "DEPARTMENT-OVERVIEW", label: "डिपार्टमेंट-ओवरव्यू " },
      { id: "CS-INTRO", label: "सीएस-इंट्रो" },
      { id: "CIC-INTRODUCTION", label: "CIC-इन्ट्रोडक्शन" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS इन्ट्रोडक्शन" },
      { id: "FRESH CALL REGISTRATION", label: "फ्रेश कॉल रजिस्ट्रेशन" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS एक्सप्लनेशन  CNP" },
      { id: "CALL RE-REGISTRATION", label: "कॉल रे रजिस्ट्रेशन" },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "रिमाइंडर जनरेशन" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "टेलीप्रेज़ेंस का व्यापक उपयोग" },
      { id: "Assistant Through RST", label: "असिस्टेंस थ्रू RST" },
    ],
  },

  bengali: {
    1: [
      { id: "LG-HISTORY", label: "LG- হিস্টোরি" },
      { id: "DEPARTMENT-OVERVIEW", label: "ডিপার্টমেন্ট-ওভারভিউ " },
      { id: "CS-INTRO", label: "CS-ইন্ট্রো" },
      { id: "CIC-INTRODUCTION", label: "CIC-ইট্রোডাকশন" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS ইট্রোডাকশন" },
      { id: "FRESH CALL REGISTRATION", label: "ফ্রেশ কল রেজিস্ট্রেশন" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS এক্সপ্লেনেশন CNP" },
      { id: "CALL RE-REGISTRATION", label: "কল রী-রেজিস্ট্রেশন   " },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "রিমাইন্ডার জেনারেশন" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "উজেস এক্সটেন্সিভ অফ টেলিপ্রেজেন্স" },
      { id: "Assistant Through RST", label: "অ্যাসিস্ট্যান্স থ্রু RST" },
    ],
  },

  gujarati: {
    1: [
      { id: "LG-HISTORY", label: "LG-ઇતિહાસ" },
      { id: "DEPARTMENT-OVERVIEW", label: "વિભાગ-ઓવરવ્યૂ" },
      { id: "CS-INTRO", label: "CS-પરિચય" },
      { id: "CIC-INTRODUCTION", label: "CIC-પરિચય" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS પરિચય" },
      { id: "FRESH CALL REGISTRATION", label: "ફ્રેશ કોલ રજીસ્ટ્રેશન" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS وضاحت CNP" },
      { id: "CALL RE-REGISTRATION", label: "કોલ પુનઃ-રજિસ્ટ્રેશન" },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "રિમાઇન્ડર જનરેશન" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "ટેલિપ્રીજન્સનો વ્યાપક ઉપયોગ" },
      { id: "Assistant Through RST", label: "RST દ્વારા સહાયક" },
    ],
  },

  marathi: {
    1: [
      { id: "LG-HISTORY", label: "LG-इतिहास" },
      { id: "DEPARTMENT-OVERVIEW", label: "विभाग-आढावा" },
      { id: "CS-INTRO", label: "CS-परिचय" },
      { id: "CIC-INTRODUCTION", label: "CIC-परिचय" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS परिचय" },
      { id: "FRESH CALL REGISTRATION", label: "फ्रेश कॉल नोंदणी" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS स्पष्टीकरण CNP" },
      { id: "CALL RE-REGISTRATION", label: "कॉल पुनर्नोंदणी" },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "रिमाइंडर जनरेशन" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "टेलीप्रेझेन्सचा विस्तृत वापर" },
      { id: "Assistant Through RST", label: "RST द्वारे सहाय्यक" },
    ],
  },

  telugu: {
    1: [
      { id: "LG-HISTORY", label: "LG-చరిత్ర" },
      { id: "DEPARTMENT-OVERVIEW", label: "విభాగం-అవలోకనం" },
      { id: "CS-INTRO", label: "CS-పరిచయం" },
      { id: "CIC-INTRODUCTION", label: "CIC-పరిచయం" },
    ],
    2: [
      { id: "GSFS INTRODUCTION", label: "GSFS పరిచయం" },
      { id: "FRESH CALL REGISTRATION", label: "ఫ్రెష్ కాల్ రిజిస్ట్రేషన్" },
      { id: "GSFS EXPLANATION CNP", label: "GSFS వివరణ CNP" },
      { id: "CALL RE-REGISTRATION", label: "కాల్ రీ-రాజిస్ట్రేషన్" },
      { id: "ONEWIEW", label: "ONEWIEW" },
      { id: "REMINDER GENERATION", label: "రిమైండర్ సృష్టి" },
      { id: "VOC", label: "VOC" },
    ],
    3: [
      { id: "AC", label: "AC" },
      { id: "REF", label: "REF" },
      { id: "WM", label: "WM" },
      { id: "TV", label: "TV" },
      { id: "usages Extensive of Telepresence", label: "టెలిప్రెజెన్స్ విస్తృత ఉపయోగం" },
      { id: "Assistant Through RST", label: "RST ద్వారా అసిస్టెంట్" },
    ],
  },
};
function DayPage() {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<Language>("english");
  const [isDayUnlocked, setIsDayUnlocked] = useState(false);
  const numericDayId = Number(dayId) as DayId;
  const topics = dayTopics[language]?.[numericDayId];
  const currentUser = localStorage.getItem("email");

  useEffect(() => {
    if ((location.state as any)?.language) {
      setLanguage((location.state as any).language);
    }
  }, [location.state]);

  /* ================= DAY UNLOCK ================= */

  useEffect(() => {
    if (!currentUser) return;

    if (numericDayId === 1) {
      setIsDayUnlocked(true);
      return;
    }

    const prevDayPassed = localStorage.getItem(
      `${currentUser}_day${numericDayId - 1}_final_completed`
    );

    setIsDayUnlocked(prevDayPassed === "true");
  }, [numericDayId, currentUser]);

  /* ================= TOPIC UNLOCK ================= */

  const isTopicUnlocked = (index: number) => {
  if (!isDayUnlocked) return false;

  // First topic always unlocked
  if (index === 0) return true;

  const prevTopicId = topics[index - 1].id;

  const prevTopicCompleted = localStorage.getItem(
    `${currentUser}_day${numericDayId}_topic${prevTopicId}_video_completed`
  );

  return prevTopicCompleted === "true";
};

   

  const isAssessmentUnlocked = (topicId: string) => {
  const videoCompleted = localStorage.getItem(
    `${currentUser}_day${numericDayId}_topic${topicId}_video_completed`
  );

  return videoCompleted === "true";
};

 const isTopicCompleted = (topicId: string) => {
  const completed = localStorage.getItem(
    `${currentUser}_day${numericDayId}_topic${topicId}_completed`
  );

  return completed === "true";
};

  /* ================= FINAL DAY ASSESSMENT ================= */

  const allTopicsCompleted =
    topics?.every((topic) => isTopicCompleted(topic.id)) ?? false;

  const isFinalAssessmentUnlocked = allTopicsCompleted;

  /* ================= NAVIGATION ================= */

  /* ================= NAVIGATION ================= */

const goToVideo = (topicId: string) => {
  navigate(`/video/${numericDayId}/${topicId}`);
};

const goToAssessment = (topicId: string) => {
  navigate(`/assessment/${numericDayId}/${topicId}`, {
    state: {
      totalTopics: topics?.length,
    },
  });
};

const goToFinalAssessment = () => {
  navigate(`/final-assessment/${numericDayId}`);
};

  /* ================= UI ================= */

  return (
    <div className="daypage-container">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Day {numericDayId} Training</h2>

      {!isDayUnlocked && numericDayId !== 1 && (
        <div className="locked-day">
          <Lock size={16} /> Complete previous day final assessment
        </div>
      )}

      <div className="topics-grid">
        {topics?.map((topic, index) => {
          const unlocked = isTopicUnlocked(index);
          const assessmentUnlocked = isAssessmentUnlocked(topic.id);
          const completed = isTopicCompleted(topic.id);

          return (
            <div
              key={topic.id}
              className={`topic-card ${
                !unlocked ? "locked" : completed ? "completed" : ""
              }`}
            >
              <div className="topic-title">
                {completed && <CheckCircle size={16} color="green" />}
                {topic.label}
              </div>

              <button
                disabled={!unlocked}
                onClick={() => goToVideo(topic.id)}
              >
                ▶ Watch Video
              </button>

              <button
                disabled={!assessmentUnlocked}
                onClick={() => goToAssessment(topic.id)}
              >
                📝 Topic Assessment
              </button>
            </div>
          );
        })}
      </div>

      {/* FINAL DAY ASSESSMENT */}

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          disabled={!isFinalAssessmentUnlocked}
          onClick={goToFinalAssessment}
        >
          🏁 Final Day Assessment
        </button>
      </div>
    </div>
  );
}

export default DayPage;