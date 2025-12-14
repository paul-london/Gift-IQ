import "./FormModal.css";
function FormModal({
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  onFormSubmit,
}) {
  return (
    <div className={`modal ${activeModal === "gift_survey" && "modal_opened"}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <form className="modal__form" onSubmit={onFormSubmit}>
          {children}
          <div className="form__btns">
            <button
              type="button"
              onClick={onClose}
              className="form__Cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="form__submit-btn">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
