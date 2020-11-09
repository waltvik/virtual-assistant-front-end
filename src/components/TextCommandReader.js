import React, { useState, useCallback, useRef } from "react";

import keyboard from "../keyboard.svg";
import {
  compareTwoStringsUsingDiceCoefficient,
  commandToRegExp,
} from "../service/utils.js";

const TextCommandReader = () => {
  const [message, setMessage] = useState("");
  const [writing, setWriting] = useState(false);

  const commands = [
    {
      command: "I would like to order *",
      callback: (food) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there!"),
      matchInterim: true,
    },
    {
      command: "Beijing",
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const commandsRef = useRef(commands);
  commandsRef.current = commands;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("na ez a value?" + event.target.value);
      matchCommands(event.target.value);
    }
  };

  function Writing() {
    if (writing) {
      return (
        <input
          style={{ position: "absolute", top: "80%" }}
          type="text"
          onKeyDown={handleKeyDown}
        />
      );
    }
    return null;
  }

  const matchCommands = useCallback((transcript) => {
    console.log("matching commands");
    commandsRef.current.forEach(
      ({
        command,
        callback,
        isFuzzyMatch = false,
        fuzzyMatchingThreshold = 0.8,
      }) => {
        const input = transcript;
        if (isFuzzyMatch) {
          const commandToString =
            typeof command === "object" ? command.toString() : command;
          const commandWithoutSpecials = commandToString
            .replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, "")
            .replace(/  +/g, " ")
            .trim();
          const howSimilar = compareTwoStringsUsingDiceCoefficient(
            commandWithoutSpecials,
            input
          );
          if (howSimilar >= fuzzyMatchingThreshold) {
            callback(commandWithoutSpecials, input, howSimilar, {});
          }
        } else {
          const pattern = commandToRegExp(command);
          const result = pattern.exec(input);
          if (result) {
            const parameters = result.slice(1);
            callback(...parameters, {});
          }
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        style={{
          background: "transparent",
          border: "none",
          position: "absolute",
          bottom: "60px",
          right: "40px",
        }}
        onClick={setWriting}
      >
        <img
          style={{
            height: "50px",
          }}
          src={keyboard}
          alt="Keyboard"
        />
      </button>
      <p style={{
          position: "absolute",
          top: "45%",
          left: "20%",
        }}>to write me, click to keyboard icon</p>
      <p style={{
          position: "absolute",
          top: "50%",
          left: "20%",
        }}>my response: {message}</p>
      <Writing />
    </div>
  );
};
export default TextCommandReader;
