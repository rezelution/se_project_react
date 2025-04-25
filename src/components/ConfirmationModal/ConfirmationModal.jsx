import "./ConfirmationModal.css";
import Modal from "../Modal/Modal"; // adjust the import path as needed

function ConfirmationModal({ isOpen, handleCloseClick, handleDelete }) {
  return (
    <Modal name="confirmation" isOpen={isOpen} onClose={handleCloseClick}>
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
    </Modal>
  );
}

export default ConfirmationModal;
