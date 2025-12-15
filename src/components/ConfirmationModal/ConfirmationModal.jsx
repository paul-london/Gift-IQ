import "./ConfirmationModal.css";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        
        {/* Icon */}
        <div className="confirm-icon">
          <span>i</span>
        </div>

        <h3 className="confirm-title">{title}</h3>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="confirm-no" onClick={onCancel}>No</button>
          <button className="confirm-yes" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
}
