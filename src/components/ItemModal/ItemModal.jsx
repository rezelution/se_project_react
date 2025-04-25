import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  return (
    <Modal name="item" isOpen={isOpen} onClose={onClose}>
      <img src={card.imageUrl} alt={card.name} className="itemModal__image" />
      <div className="itemModal__footer">
        <div>
          <h2 className="itemModal__caption">{card.name}</h2>
          <p className="itemModal__weather">Weather: {card.weather}</p>
        </div>
        <button
          onClick={onDeleteClick}
          type="button"
          className="itemModal__delete-btn"
        >
          Delete Item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
