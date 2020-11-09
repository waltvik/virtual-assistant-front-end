import React from "react";
//import "./main.css";
import mic from "../../microphone.svg";
import keyboard from "../../keyboard.svg";
import menu from "../../menu.svg";
import VoiceRecorder from "../../components/VoiceRecorder";
import TextCommandReader from "../../components/TextCommandReader";

const MainPage = () => {
  return (
    <div>
      <div className="welcome">Welcome to your VirtualAssistant</div>
      <VoiceRecorder />

      <TextCommandReader />
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
