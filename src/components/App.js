import React from "react";
import Popup from "./Popup.js";
import Training from "./Training.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countLetter: 0,
      countErr: 0,
      letterErr: -1,
      arrayOfLetters: [],
      printSpeed: 0,
      starting: false,
      timerId: "",
      isOpenPopupLayout: false,
      isOpenPopupFinish: false,
    };
    this.handleKeyupBind = this.handleKeyup.bind(this);
    this.handleStarting = this.handleStarting.bind(this);
    this.resetTraining = this.resetTraining.bind(this);
  }

  handleKeyup(evt) {
    if (this.checkKkeyModifier(evt)) return;

    if (this.checkKkeyFinish()) {
      this.setState({
        isOpenPopupFinish: true,
      });
      clearInterval(this.state.timerId);
      document.removeEventListener("keyup", this.handleKeyupBind);
      return;
    }

    if (this.checkKkeyRu(evt)) {
      this.setState({
        isOpenPopupLayout: true,
        countLetter: 0,
        countErr: 0,
        letterErr: -1,
        printSpeed: 0,
      });
      clearInterval(this.state.timerId);
      document.removeEventListener("keyup", this.handleKeyupBind);
      return;
    }

    if (this.checkKkeyErr(evt)) return;

    this.setState((state) => {
      return { countLetter: state.countLetter + 1, letterErr: -1 };
    });
  }

  checkKkeyModifier(evt) {
    return evt.key.length > 1;
  }

  checkKkeyFinish() {
    return this.state.countLetter + 1 === this.state.arrayOfLetters.length;
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

  handleStarting(evt) {
    evt.target.blur();
    this.setState({ starting: true });
    this.updatePrintSpeed();
    document.addEventListener("keyup", this.handleKeyupBind);
  }

  resetTraining(isFetch) {
    if (isFetch) {
      this.updateArrayOfLetters();
    }

    this.setState({
      isOpenPopupLayout: false,
      isOpenPopupFinish: false,
      starting: false,
      countLetter: 0,
      countErr: 0,
      letterErr: -1,
      printSpeed: 0,
    });
    clearInterval(this.state.timerId);
  }

  updateArrayOfLetters() {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=1")
      .then((res) => {
        if (!res.ok) {
          return `Ошибка: ${res.status}`;
        }
        return res.json();
      })
      .then((res) => {
        this.setState({ arrayOfLetters: res.join("  ").replace(/\s+/g, " ").split("") });
      });
  }

  componentDidMount() {
    this.updateArrayOfLetters();
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyupBind);
  }

  render() {
    return (
      <>
        <Popup isOpen={!this.state.starting}>
          <h1 className="popup__title">Приготовься печатать. Поехали!</h1>
          <button onClick={this.handleStarting} className="popup__button">
            Начать печатать
          </button>
        </Popup>
        <Popup isOpen={this.state.isOpenPopupLayout}>
          <h1 className="popup__title">Пожалуйста, смени раскладку клавиатуры на English.</h1>
          <button
            onClick={() => {
              this.resetTraining(false);
            }}
            className="popup__button"
          >
            Продолжить
          </button>
        </Popup>
        <Popup isOpen={this.state.isOpenPopupFinish}>
          <h1 className="popup__title">Ну, неплохо!</h1>
          <p className="popup__text">Скорость печати: {this.state.printSpeed}</p>
          <p className="popup__text">
            Точность:
            {100 - ((this.state.countErr / this.state.arrayOfLetters.length) * 100).toFixed(2) ||
              100}
            %
          </p>
          <button
            onClick={() => {
              this.resetTraining(true);
            }}
            className="popup__button"
          >
            Заново
          </button>
        </Popup>
        <Training
          arrayOfLetters={this.state.arrayOfLetters}
          countLetter={this.state.countLetter}
          letterErr={this.state.letterErr}
          printSpeed={this.state.printSpeed}
          countErr={this.state.countErr}
          resetTraining={this.resetTraining}
        ></Training>
      </>
    );
  }
}

export default App;
