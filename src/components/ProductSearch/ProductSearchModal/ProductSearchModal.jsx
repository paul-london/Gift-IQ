import ProductSearch from "../ProductSearch";
import "../ProductSearch.css";

export default function ProductSearchModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box edit-profile-modal">
        <h2 className="modal-title">Find Gifts</h2>

        <ProductSearch />

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
