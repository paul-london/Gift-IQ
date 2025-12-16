import React, { useState } from "react";
import { uploadAvatar } from "../../utils/api";
import "../EditProfileModal/EditProfileModal.css";

export default function UploadAvatarModal({
  onClose,
  onUploaded,
  token,
  currentAvatar,
}) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) return alert("Please choose a file first.");

    try {
      onUploaded(file);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Avatar upload failed");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="edit-profile-modal">
        <h2 className="modal-title">Upload New Avatar</h2>

        <div className="avatar-section">
          {preview ? (
            <img src={preview} className="avatar-preview" alt="preview" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>

        <div className="file-upload-container">
          <label className="file-label">Choose Image</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn save" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
