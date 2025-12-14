import "./FormModal.css";
import { useEffect } from "react";

function FormModal({
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  onFormSubmit,
  hideDefaultButtons = false,
}) {
  useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (activeModal) {
    document.addEventListener("keydown", handleEsc);
  }

  return () => {
    document.removeEventListener("keydown", handleEsc);
  };
}, [activeModal, onClose]);

  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <form className="modal__form" onSubmit={onFormSubmit}>
          {children}
          {!hideDefaultButtons && (
            <>
              <button type="submit" className="modal__submit-btn">
                {buttonText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="modal__Cancel-btn"
              >
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormModal;
