import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Users, Package, Briefcase } from "lucide-react";
import Navbar from "../components/Navbar";

type Language =
  | "english"
  | "hindi"
  | "bengali"
  | "gujarati"
  | "marathi"
  | "telugu";

type TrainingModule = {
  title: string;
  video: string;
};

type TrainingData = Record<
  Language,
  {
    newHired: TrainingModule;
    softSkill: TrainingModule;
    product: TrainingModule;
    ojt: TrainingModule;
    monthlyPkt: TrainingModule;
  }
>;


function Home() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>("english");
  const trainingData: TrainingData = {
    english: {
  newHired: { title: "New Hired Training", video: "/videos/english/new-hired.mp4" },
  softSkill: { title: "Soft Skill", video: "/videos/english/soft-skill.mp4" },
  product: { title: "Product Training", video: "/videos/english/product.mp4" },
  ojt: { title: "On Job Training", video: "/videos/english/ojt.mp4" },
  monthlyPkt: { title: "Monthly PKT", video: "/videos/english/monthly-pkt.mp4" }
},
    hindi: {
      newHired: { title: "न्यू हायर्ड ट्रेनिंग ", video: "/videos/hindi/new-hired.mp4" },
      softSkill: { title: "सॉफ्ट स्किल", video: "/videos/hindi/soft-skill.mp4" },
      product: { title: "प्रोडक्ट ट्रेनिंग ", video: "/videos/hindi/product.mp4" },
      ojt: { title: "ऑन जॉब ट्रेनिंग ", video: "/videos/hindi/ojt.mp4" },
      monthlyPkt: { title: "मासिक PKT", video: "/videos/hindi/monthly-pkt.mp4" }
    },
    bengali: {
      newHired: { title: "নিউ হায়ারড ট্রেনিং ", video: "/videos/bengali/new-hired.mp4" },
      softSkill: { title: "সফট স্কিল", video: "/videos/bengali/soft-skill.mp4" },
      product: { title: "প্রোডাক্ট ট্রেনিং ", video: "/videos/bengali/product.mp4" },
      ojt: { title: "অন জব ট্রেনিং ", video: "/videos/bengali/ojt.mp4" },
      monthlyPkt: { title: "मासिक PKT", video: "/videos/hindi/monthly-pkt.mp4" }
    },
    gujarati: {
      newHired: { title: "નવા કર્મચારી તાલીમ", video: "/videos/gujarati/new-hired.mp4" },
      softSkill: { title: "સોફ્ટ સ્કિલ", video: "/videos/gujarati/soft-skill.mp4" },
      product: { title: "ઉત્પાદન તાલીમ", video: "/videos/gujarati/product.mp4" },
      ojt: { title: "કાર્યસ્થળ તાલીમ", video: "/videos/gujarati/ojt.mp4" },
      monthlyPkt: { title: "मासिक PKT", video: "/videos/hindi/monthly-pkt.mp4" }
    },
    marathi: {
      newHired: { title: "नवीन कर्मचारी प्रशिक्षण", video: "/videos/marathi/new-hired.mp4" },
      softSkill: { title: "सॉफ्ट स्किल", video: "/videos/marathi/soft-skill.mp4" },
      product: { title: "उत्पादन प्रशिक्षण", video: "/videos/marathi/product.mp4" },
      ojt: { title: "कामावर प्रशिक्षण", video: "/videos/marathi/ojt.mp4" },
      monthlyPkt: { title: "मासिक PKT", video: "/videos/hindi/monthly-pkt.mp4" }
    },
    telugu: {
      newHired: { title: "కొత్త ఉద్యోగి శిక్షణ", video: "/videos/telugu/new-hired.mp4" },
      softSkill: { title: "సాఫ్ట్ స్కిల్", video: "/videos/telugu/soft-skill.mp4" },
      product: { title: "ఉత్పత్తి శిక్షణ", video: "/videos/telugu/product.mp4" },
      ojt: { title: "ఉద్యోగ స్థల శిక్షణ", video: "/videos/telugu/ojt.mp4" },
      monthlyPkt: { title: "मासिक PKT", video: "/videos/hindi/monthly-pkt.mp4" }
    },
  };

  const englishData = trainingData.english;
const selectedData = trainingData[language];



const renderModuleTitle = (key: keyof typeof selectedData) => {
  return (
    <>
      <span className="module-title-en">
        {englishData[key].title}
      </span>

      {language !== "english" && (
        <span className="module-title-local">
          {selectedData[key].title}
        </span>
      )}
    </>
  )}
  


  return (
     
    <>
      <Navbar />

      <div className="home-container">
       

        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2>Welcome to Digital Training World</h2>
              <p className="text-xl font-semibold mb-2">
                Hi, I Am Your Digital Trainer
              </p>
              <p>I will help you with all the trainings required in CIC.</p>
            </div>
          </div>
        </section>

        {/* Language Selection */}
        <section className="language-section" style={{ textAlign: "center", margin: "30px 0" }}>
          <h2 style={{ fontWeight: "bold" }}>SELECT YOUR LANGUAGE</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px", flexWrap: "wrap" }}>
            {(
              ["english", "hindi", "bengali", "gujarati", "marathi", "telugu"] as Language[]
            ).map((lang) => (
              <button
                key={lang}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: language === lang ? "2px solid #af514c" : "1px solid gray",
                  backgroundColor: language === lang ? "#49403f" : "#8f8887",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Training Modules */}
        <section className="lets-start">
          <h2>Let's Start Your Training Journey</h2>
          <p>Choose a training module to begin:</p>

          <div
            className="training-buttons"
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <button
              className="training-btn"
              onClick={() =>
                navigate("/new-hired", { state: { language } })
              }
            >
              <GraduationCap size={40} />
              <h3>{renderModuleTitle("newHired")}</h3>
            </button>

            <button
              className="training-btn"
              onClick={() =>
                navigate("/soft-skill", {
                  state: { video: selectedData.softSkill.video },
                })
              }
            >
              <Users size={40} />
             <h3>{renderModuleTitle("softSkill")}</h3>
            </button>

            <button
              className="training-btn"
              onClick={() =>
                navigate("/product-training", {
                  state: { video: selectedData.product.video },
                })
              }
            >
              <Package size={40} />
              <h3>{renderModuleTitle("product")}</h3>
            </button>

            <button
              className="training-btn"
              onClick={() =>
                navigate("/ojt", {
                  state: { video: selectedData.ojt.video },
                })
              }
            >
              <Briefcase size={40} />
              <h3>{renderModuleTitle("ojt")}</h3>
            </button>
            <button
  className="training-btn"
  onClick={() =>
    navigate("/monthly-pkt", {
      state: { video: selectedData.monthlyPkt.video },
    })
  }
>
  <Briefcase size={40} />
  <h3>{renderModuleTitle("monthlyPkt")}</h3>
</button>
            
          </div>
        </section>
        {/* Floating Assistance Button */}
<button
  className="floating-assistance-btn"
  onClick={() => navigate("/support")}
>
  Need Assistance?
</button>
      </div>
    </>
  );
}

export default Home;
