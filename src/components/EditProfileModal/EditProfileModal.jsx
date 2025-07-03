import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function EditProfileModal({
  isOpen,
  onClose,
  handleUpdateProfile,
  currentUser,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) return;

    const updatedProfile = {
      name: values.name || currentUser.name,
      imageUrl: values.imageUrl?.trim()
        ? values.imageUrl
        : currentUser.imageUrl,
    };

    if (isValid) {
      console.log("Updated profile values:", updatedProfile);
      handleUpdateProfile(updatedProfile);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      name="edit-profile"
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="editProfileName"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label_avatar">
        Avatar URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="editProfileImageUrl"
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
