import React from "react";

function Letter({ letter, countLetter, letterErr, index }) {
  return (
    <span
      className={`${countLetter === index ? "letter_current" : ""}${
        letterErr === index ? "-err" : ""
      }${countLetter > index ? "letter_passed" : ""}`}
    >
      {letter}
    </span>
  );
}

export default Letter;
