import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">{props.children}</div>
    </div>
  );
}
export default Popup;
