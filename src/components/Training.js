import "./Training.css";
import Letter from "./Letter.js";
function Training({ arrayOfLetters, countLetter, letterErr, printSpeed, countErr }) {
  return (
    <div className="training">
      <div className="training__text-container">
        {arrayOfLetters.map((letter, i) => (
          <Letter
            key={i}
            letter={letter}
            countLetter={countLetter}
            letterErr={letterErr}
            index={i}
          ></Letter>
        ))}
      </div>
      <div className="training__info">
        <p className="training__info-item">Скорость</p>
        <p className="training__info-item">{printSpeed} зн./мин</p>
        <p className="training__info-item">Точность</p>
        <p className="training__info-item">
          {100 - ((countErr / arrayOfLetters.length) * 100).toFixed(2)} %
        </p>
      </div>
    </div>
  );
}

export default Training;
