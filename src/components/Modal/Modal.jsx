import { useEffect } from "react";
import closeBtn from "../../assets/modal_close_button.png";

const Modal = ({ name, onClose, children, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // don’t forget to remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // here is the handler to be able to click anywhere on the overlay to close it
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={closeBtn} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
