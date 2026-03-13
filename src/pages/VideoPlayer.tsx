import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type Language =
  | "english"
  | "hindi"
  | "bengali"
  | "gujarati"
  | "marathi"
  | "telugu";

type VideoLibrary = {
  [category: string]: {
    [topic: string]: {
      [key in Language]: string;
    };
  };
};
  const videoLibrary: VideoLibrary = {
  "new-hired-training": {
    // Day 1 Topics
    "LG-HISTORY": {
      english:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/LGHistory1.mp4",
    },
    "DEPARTMENT-OVERVIEW": {
      english:"http://10.102.60.95/lgapptest/video/DepartmentOverview2.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/DepartmentOverview2.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/DepartmentOverview2.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/DepartmentOverview.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/DepartmentOverview.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/DepartmentOverview.mp4",
    },
    "CS-INTRO": {
      english:"http://10.102.60.95/lgapptest/video/Customerservice3.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/Customerservice3.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/Customerservice.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/Customerservice.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/Customerservice.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/Customerservice.mp4",
    },
    "CIC-INTRODUCTION": {
      english:"http://10.102.60.95/lgapptest/video/4CIC_Introduction.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/4CIC_Introduction.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/CIC_Introduction.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/CIC_Introduction.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/CIC_Introduction.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/CIC_Introduction.mp4",
    },

    // Day 2 Topics
    "GSFS INTRODUCTION": {
      english:"http://10.102.60.95/lgapptest/video/5GSFSIntroductionc%20.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/5GSFSIntroductionc%20.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/5GSFSIntroductionc%20.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/GSFSIntroduction.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/GSFSIntroduction.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/GSFSIntroduction.mp4",
    },
    "FRESH CALL REGISTRATION": {
      english:"http://10.102.60.95/lgapptest/video/NewCallRegistration6.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/NewCallRegistration6.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/NewCallRegistration.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/NewCallRegistration.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/NewCallRegistration.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/NewCallRegistration.mp4",
    },
    "GSFS EXPLANATION CNP": {
      english:"http://10.102.60.95/lgapptest/video/7CNPRegistration.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/7CNPRegistration.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/CNPRegistration.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/CNPRegistration.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/CNPRegistration.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/CNPRegistration.mp4",
    },
    "CALL RE-REGISTRATION": {
      english:"http://10.102.60.95/lgapptest/video/8CallRegistrationExistingCustomer.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/8CallRegistrationExistingCustomer.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/CallReRegistration.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/CallReRegistration.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/CallReRegistration.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/CallReRegistration.mp4",
    },
    "ONEWIEW": {
      english:"http://10.102.60.95/lgapptest/video/9OneViewMadewithFlexClip.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/9OneViewMadewithFlexClip.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/OneView.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/OneView.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/OneView.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/OneView.mp4",
    },
    "REMINDER GENERATION": {
      english:"http://10.102.60.95/lgapptest/video/10ReminderCreation.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/10ReminderCreation.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/ReminderCreation.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/ReminderCreation.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/ReminderCreation.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/ReminderCreation.mp4",
    },
    "VOC": {
      english:"http://10.102.60.95/lgapptest/video/11VOC.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/11VOC.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/VOC.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/VOC.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/VOC.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/VOC.mp4",
    },

    // Day 3 Topics
    "AC": {
      english:"http://10.102.60.95/lgapptest/video/12ACServicepolicy.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/ACServicepolicy.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/ACServicepolicy.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/ACServicepolicy.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/ACServicepolicy.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/ACServicepolicy.mp4",
    },
    "REF": {
      english:"http://10.102.60.95/lgapptest/video/13RefServicepolicy_Eng.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/RefServicepolicy.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/RefServicepolicy.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/RefServicepolicy.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/RefServicepolicy.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/RefServicepolicy.mp4",
    },
    "WM": {
      english:"http://10.102.60.95/lgapptest/video/14WM.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/WM.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/WM.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/WM.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/WM.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/WM.mp4",
    },
    "TV": {
      english:"http://10.102.60.95/lgapptest/video/15TV.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/TV.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/TV.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/TV.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/TV.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/TV.mp4",
    },
    "usages Extensive of Telepresence": {
      english:"http://10.102.60.95/lgapptest/video/SOP1ExtensiveusagesofTelepresence.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/SOP1ExtensiveusagesofTelepresence.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/SOP1ExtensiveusagesofTelepresence.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/SOP1ExtensiveusagesofTelepresence.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/SOP1ExtensiveusagesofTelepresence.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/SOP1ExtensiveusagesofTelepresence.mp4",
    },
    "Assistant Through RST": {
      english:"http://10.102.60.95/lgapptest/video/SOP2AssistantThroughRST.mp4",
      hindi:"http://10.102.60.95/lgapptest/video/hi/SOP2AssistantThroughRST.mp4",
      bengali:"http://10.102.60.95/lgapptest/video/bn/SOP2AssistantThroughRST.mp4",
      gujarati:"http://10.102.60.95/lgapptest/video/gu/SOP2AssistantThroughRST.mp4",
      marathi:"http://10.102.60.95/lgapptest/video/mr/SOP2AssistantThroughRST.mp4",
      telugu:"http://10.102.60.95/lgapptest/video/te/SOP2AssistantThroughRST.mp4",
    },
  },
};
const VideoPlayer: React.FC = () => {
  const { dayId, topicId } = useParams<{
    dayId: string;
    topicId: string;
  }>();

  const navigate = useNavigate();
  const location = useLocation();

  const language: Language =
    (location.state as any)?.language || "english";

  const currentUser = localStorage.getItem("username");

  const decodedTopic = topicId ? decodeURIComponent(topicId) : "";

  const videoUrl =
    videoLibrary["new-hired-training"]?.[decodedTopic]?.[language];

  const handleVideoComplete = () => {
    if (!currentUser || !dayId || !decodedTopic) return;

    // ✅ Save video completion
    localStorage.setItem(
      `${currentUser}_day${dayId}_topic${decodedTopic}_video_completed`,
      "true"
    );

    alert("✅ Video completed! Now take assessment.");

    // ✅ Navigate AFTER completion
    navigate(`/assesment/${dayId}/${decodedTopic}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      {videoUrl ? (
        <video
          key={videoUrl}
          src={videoUrl}
          controls
          autoPlay
          onEnded={handleVideoComplete}
          style={{
            width: "100%",
            maxHeight: "600px",
            borderRadius: "12px",
          }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          ❌ Video not available in {language.toUpperCase()}
        </p>
      )}
    </div>
  );
}

export default VideoPlayer;