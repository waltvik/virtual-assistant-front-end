import React from "react";
import "./main.css";
import mic from "../../microphone.svg";
import keyboard from "../../keyboard.svg";
import menu from "../../menu.svg";
import VoiceRecorder from "../../components/VoiceRecorder";

const MainPage = () => {
  return (
    <div>
      <div className="welcome">Welcome to your VirtualAssistant</div>
      <VoiceRecorder />
      <img
        style={{
          height: "50px",
          position: "absolute",
          top: "60%",
          left: "46%",
        }}
        src={mic}
        alt="Mic"
      />
      <img
        style={{
          height: "50px",
          position: "absolute",
          bottom: "60px",
          right: "40px",
        }}
        src={keyboard}
        alt="Mic"
      />
      <img
        style={{
          height: "50px",
          position: "absolute",
          bottom: "60px",
          left: "40px",
        }}
        src={menu}
        alt="Mic"
      />
    </div>
  );
};

export default MainPage;
