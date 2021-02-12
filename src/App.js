import React from "react";
import "./App.css";
import { testText } from "./testText";
import Letter from "./Letter.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = { count: 0, arrayOfLetters: testText };
    this.handleKeyupBind = this.handleKeyup.bind(this);
  }

  handleKeyup(evt) {
    if (evt.key === this.state.arrayOfLetters[this.state.count]) {
      this.setState((state) => {
        return { count: state.count + 1 };
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyupBind);
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
    document.removeEventListener("keydown", this.handleKeyupBind);
  }

  render() {
    return this.state.arrayOfLetters.map((letter, i) => (
      <Letter key={i} letter={letter} count={this.state.count} index={i}></Letter>
    ));
  }
}

export default App;
