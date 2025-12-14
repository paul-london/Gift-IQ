import FormModal from "../FormModal/FormModal";
import { useForm } from "../../hooks/useForm";
import "./SignUpModal.css";

export default function SignUpModal({
  isOpen,
  onClose,
  onSignInModal,
  onSignUp,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values);
  };

  return (
    <FormModal
      title="sign up"
      activeModal={isOpen}
      onClose={onClose}
      onFormSubmit={handleSubmit}
      hideDefaultButtons={true}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
          className="modal__input"
          value={values.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal__signin__auth-buttons">
        <button type="submit" className="modal__signin-button">
          Sign Up
        </button>

        <button
          type="button"
          className="modal__signup-button"
          onClick={() => {
            onSignInModal();
            onClose();
          }}
        >
          Or Log in
        </button>
      </div>
    </FormModal>
  );
}
