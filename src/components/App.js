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
      starting: false,
      timerId: "",
    };
    this.handleKeyupBind = this.handleKeyup.bind(this);
    this.handleStarEnd = this.handleStarEnd.bind(this);
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

  updatePrintSpeed() {
    const startData = new Date();
    let timerId = setInterval(() => {
      const currentDate = new Date();
      const printSpeed = Math.round(this.state.countLetter / ((+currentDate - +startData) / 60000));
      this.setState({ printSpeed: printSpeed });
    }, 1000);
    this.setState({ timerId: timerId });
  }

  handleStarEnd(start) {
    if (start) {
      this.setState({ starting: true });
      console.log(this.state.starting);
      this.updatePrintSpeed();
    } else {
      this.setState({ starting: false, countLetter: 0, countErr: 0, letterErr: -1, printSpeed: 0 });
      clearInterval(this.state.timerId);
    }
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
        <Popup starting={this.state.starting} handleStarting={this.handleStarEnd}></Popup>
        <Training
          arrayOfLetters={this.state.arrayOfLetters}
          countLetter={this.state.countLetter}
          letterErr={this.state.letterErr}
          printSpeed={this.state.printSpeed}
          countErr={this.state.countErr}
          resetTraining={this.handleStarEnd}
        ></Training>
      </>
    );
  }
}

export default App;
