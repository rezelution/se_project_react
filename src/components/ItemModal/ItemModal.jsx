import "./ItemModal.css";
import closeBtn from "../../assets/modal_close_button_white.png";

function ItemModal({ isOpen, handleCloseClick, card, handleDeleteClick }) {
  return (
    <div className={`itemModal ${isOpen && "itemModal__opened"}`}>
      <div className="itemModal__content">
        <button
          onClick={handleCloseClick}
          type="button"
          className="itemModal__close"
        >
          <img src={closeBtn} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="itemModal__image" />
        <div className="itemModal__footer">
          <div>
            <h2 className="itemModal__caption">{card.name}</h2>
            <p className="itemModal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="itemModal__delete-btn"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
