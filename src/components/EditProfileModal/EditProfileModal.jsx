import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
  handleUpdateProfile,
  currentUser,
}) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        imageUrl: currentUser.imageUrl || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  //e represents a form submission event
  //then it stops the default behavior of reloading the page
  //then it checks that all form fields are entered
  //? optional chaining is used here so we are only sending if values exist
  //trim removes any spaces
  //then checks if everything is ok before sending
  //then sends everything and resets form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return;

    const updatedProfile = {};
    if (values.name?.trim()) updatedProfile.name = values.name.trim();
    if (values.imageUrl?.trim())
      updatedProfile.imageUrl = values.imageUrl.trim();

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
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
