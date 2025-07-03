import "./ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";

function ModalWithForm({ name, onClose, isOpen, customClass, ...props }) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isOpen={isOpen}
      customClass={customClass}
    >
      <h2 className="modal__title">{props.title}</h2>

      <form onSubmit={props.onSubmit} className="modal__form">
        {props.children}
        <div className="modal__buttons-group">
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
          <button
            onClick={props.onClick}
            type="button"
            className="modal__alternateButton"
          >
            {" "}
            {props.alternateButtonText}{" "}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
