import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup ${false ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <h1 className="popup__title">Приготовься печатать. Поехали!</h1>
        <button className="popup__button">Начать печатать</button>
      </div>
    </div>
  );
}
export default Popup;
