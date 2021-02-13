import React from "react";
import "./Letter.css";

function Letter({ letter, countLetter, letterErr, index }) {
  return (
    <span
      className={`letter ${countLetter === index ? "letter_current" : ""}${
        letterErr === index ? "-err" : ""
      }${countLetter > index ? "letter_passed" : ""}`}
    >
      {letter}
    </span>
  );
}

export default Letter;
