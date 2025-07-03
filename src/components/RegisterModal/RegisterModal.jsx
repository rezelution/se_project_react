import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  handleRegistration,
  handleLoginClick,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    const placeholderUrl = `https://ui-avatars.com/api/?name=${values.name[0]}&background=random`;

    if (!e.target.checkValidity()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (isValid) {
      console.log("Form values:", values);
      handleRegistration({
        email: values.email,
        password: values.password,
        name: values.name,
        imageUrl: !values.imageUrl?.trim() ? placeholderUrl : values.imageUrl,
      });
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      name="sign-up"
      alternateButtonText="or Log In"
      onClick={handleLoginClick}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          id="registrationEmail"
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
          id="registrationPassword"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          id="registrationName"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label_avatar">
        Avatar URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="registrationImageUrl"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.imageUrl || ""}
          pattern="https?://.+"
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
