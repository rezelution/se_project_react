import "./ConfirmationModal.css";
import closeBtn from "../../assets/modal_close_button.png";

function ConfirmationModal({ isOpen, handleCloseClick, handleDelete }) {
  return (
    <div
      className={`confirmation-modal ${isOpen && "confirmation-modal__opened"}`}
    >
      <div className="confirmation-modal__warning">
        <button
          onClick={handleCloseClick}
          type="button"
          className="itemModal__close"
        >
          <img src={closeBtn} alt="Close" />
        </button>
        <div className="confirmation-modal__text">
          <p>
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
        </div>
        <button
          onClick={handleDelete}
          type="button"
          className="confirmation-modal__button confirmation-modal__button--delete"
        >
          Yes, delete item
        </button>
        <button
          onClick={handleCloseClick}
          type="button"
          className="confirmation-modal__button confirmation-modal__button--cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
