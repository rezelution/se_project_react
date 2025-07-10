import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";

export default function LogInModal({
  isOpen,
  onClose,
  handleLogin,
  handleRegisterClick,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (isValid) {
      handleLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      name="log-in"
      alternateButtonText="or Sign Up"
      onClick={handleRegisterClick}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
