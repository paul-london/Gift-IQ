import "./GiftCard.css";
export default function GiftCard({ gift, index, onStatusChange, onDelete }) {
  return (
    <div className="gift-card">
      {/* Delete button (top right) */}
      <button className="gift-card__delete" onClick={() => onDelete(index)}>
        ✕
      </button>

      <div className="gift-card__content">
        <div className="gift-card__header">
          <h4 className="gift-card__title">{gift.name}</h4>
          <p className="gift-card__price">${gift.price}</p>
        </div>

        {/* Optional link */}
        {gift.link && (
          <a href={gift.link} target="_blank" className="gift-card__link">
            View Item →
          </a>
        )}

        <p className="gift-card__description">{gift.description}</p>

        <div className="gift-card__footer">
          <label className="gift-card__status-label">Gift Status</label>

          <select
            value={gift.status}
            onChange={(e) => onStatusChange(index, e.target.value)}
            className="gift-card__select"
          >
            <option value="none">Not chosen</option>
            <option value="considering">Considering</option>
            <option value="purchased">Purchased</option>
          </select>
        </div>
      </div>
    </div>
  );
}
