import React from "react";

function Letter({ letter, count, index }) {
  return <span className={count === index ? "letter_current" : undefined}>{letter}</span>;
}

export default Letter;
