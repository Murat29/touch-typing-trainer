import React from "react";
import { testText } from "./testText";
import Popup from "./Popup.js";
import Training from "./Training.js";

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
    if (this.checkKkeyModifier(evt)) return;

    if (this.checkKkeyRu(evt)) {
      console.log("Поменяйте раскладку");
      return;
    }

    if (this.checkKkeyRu(evt)) return;
    if (this.checkKkeyErr(evt)) return;

    this.setState((state) => {
      return { countLetter: state.countLetter + 1, letterErr: -1 };
    });
  }

  checkKkeyModifier(evt) {
    return evt.key.length > 1;
  }

  checkKkeyRu(evt) {
    return /[А-яа-яЁё]/.test(evt.key);
  }

  checkKkeyErr(evt) {
    if (evt.key !== this.state.arrayOfLetters[this.state.countLetter]) {
      this.setState((state) => {
        return { letterErr: state.countLetter, countErr: state.countErr + 1 };
      });
      return true;
    }
  }

  handleStarting() {
    const startData = new Date();
    let timerId = setInterval(() => {
      let currentDate = new Date();
      const printSpeed = Math.round(this.state.countLetter / ((+currentDate - +startData) / 60000));
      this.setState({ printSpeed: printSpeed });
      console.log(this.state.printSpeed);
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
        <Popup></Popup>
        <Training
          arrayOfLetters={this.state.arrayOfLetters}
          countLetter={this.state.countLetter}
          letterErr={this.state.letterErr}
          printSpeed={this.state.printSpeed}
          countErr={this.state.countErr}
        ></Training>
      </>
    );
  }
}

export default App;
