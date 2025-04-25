import "./ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";

function ModalWithForm({ name, onClose, isOpen, ...props }) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{props.title}</h2>

      <form onSubmit={props.onSubmit} className="modal__form">
        {props.children}
        <button
          type="submit"
          className={`modal__submit ${
            props.isValid ? "modal__submit_valid" : "modal__submit_invalid"
          }`}
          disabled={!props.isValid}
        >
          {" "}
          {props.buttonText}{" "}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
