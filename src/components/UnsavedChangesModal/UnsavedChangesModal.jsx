import "./UnsavedChangesModal.css";

export default function UnsavedChangesModal({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3 className="confirm-title">Go back to Homepage?</h3>

        <div className="confirm-icon">
          <span>i</span>
        </div>

        <p className="confirm-message">
          Your changes will not be saved.
        </p>

        <div className="confirm-actions">
          <button className="confirm-btn confirm-btn--no" onClick={onCancel}>
            No
          </button>

          <button className="confirm-btn confirm-btn--yes" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
