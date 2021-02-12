import React from "react";
import "./App.css";
import { testText } from "./testText";
import Letter from "./Letter.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countLetter: 0,
      countErr: 0,
      letterErr: -1,
      arrayOfLetters: testText,
      printSpeed: 0,
    };
    this.handleKeyupBind = this.handleKeyup.bind(this);
  }

  handleKeyup(evt) {
    if (evt.key !== this.state.arrayOfLetters[this.state.countLetter]) {
      this.setState((state) => {
        return { letterErr: state.countLetter, countErr: state.countErr + 1 };
      });
      console.log(this.state.countErr);
    }
    if (evt.key === this.state.arrayOfLetters[this.state.countLetter]) {
      this.setState((state) => {
        return { countLetter: state.countLetter + 1, letterErr: -1 };
      });
    }
  }

  handleStarting() {
    const startData = new Date();
    let timerId = setInterval(() => {
      const currentDate = new Date();
      const printSpeed = Math.round(this.state.countLetter / ((+currentDate - +startData) / 60000));
      this.setState({ printSpeed: printSpeed });
    }, 1000);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyupBind);
    // fetch("https://baconipsum.com/api/?type=all-meat&paras=2")
    //   .then((res) => {
    //     if (!res.ok) {
    //       return `Ошибка: ${res.status}`;
    //     }
    //     return res.json();
    //   })
    //   .then((res) => {
    //     setText(res.join("  ").replace(/\s+/g, " ").split(""));
    //   });
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyupBind);
  }

  render() {
    return (
      <>
        {this.state.arrayOfLetters.map((letter, i) => (
          <Letter
            key={i}
            letter={letter}
            countLetter={this.state.countLetter}
            letterErr={this.state.letterErr}
            index={i}
          ></Letter>
        ))}
        <button onClick={this.handleStarting.bind(this)}>Старт</button>
        <p>Скорость {this.state.printSpeed}</p>
        <p>
          точность
          {100 - ((this.state.countErr / this.state.arrayOfLetters.length) * 100).toFixed(2)}
        </p>
      </>
    );
  }
}

export default App;
