import "./Popup.css";

function Popup({ starting, handleStarting }) {
  return (
    <div className={`popup ${!starting ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <h1 className="popup__title">Приготовься печатать. Поехали!</h1>
        <button
          onClick={() => {
            handleStarting(true);
          }}
          className="popup__button"
        >
          Начать печатать
        </button>
      </div>
    </div>
  );
}
export default Popup;
