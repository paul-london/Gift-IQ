import "./EditProfileModal.css";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  open,
  onClose,
  onSave,
  currentName = "",
  currentRelationship = "",
}) {
  if (!open) return null;

  const [name, setName] = useState(currentName);
  const [relationship, setRelationship] = useState(currentRelationship);

  // Sync modal fields when reopening modal
  useEffect(() => {
    setName(currentName || "");
    setRelationship(currentRelationship || "");
  }, [currentName, currentRelationship, open]);

  function handleSubmit() {
    if (!onSave) return; // prevents crash
    onSave({ name, relationship });
    onClose(); // reset UI
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box edit-profile-modal">
        <h2 className="modal-title">Edit Profile</h2>

        {/* NAME FIELD */}
        <div className="input-group">
          <label className="field-label">Name</label>
          <input
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        {/* RELATIONSHIP FIELD */}
        <div className="input-group">
          <label className="field-label">Relationship</label>
          <input
            className="input-field"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="e.g. Friend, Mom, Partner"
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="modal-btn save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
