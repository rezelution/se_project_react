import "./ItemModal.css";
import closeBtn from "../../assets/modal_close_button_white.png";

function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div
      className={`itemModal ${
        activeModal === "preview" && "itemModal__opened"
      }`}
    >
      <div className="itemModal__content">
        <button
          onClick={handleCloseClick}
          type="button"
          className="itemModal__close"
        >
          <img src={closeBtn} alt="Close" />
        </button>
        <img src={card.link} alt={card.name} className="itemModal__image" />
        <div className="itemModal__footer">
          <h2 className="itemModal__caption">{card.name}</h2>
          <p className="itemModal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
