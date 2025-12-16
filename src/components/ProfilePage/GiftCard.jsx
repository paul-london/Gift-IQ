import "./GiftCard.css";

export default function GiftCard({ gift, index, onStatusChange, onDelete }) {
  return (
    <div className="giftcard">
      {/* HEADER ROW */}
      <div className="giftcard-top">
        <h4 className="giftcard-title">{gift.name}</h4>

        <button className="giftcard-close" onClick={() => onDelete(index)}>
          ✕
        </button>
      </div>

      <div className="giftcard-body">
        {/* IMAGE */}
        <img
          src={gift.link}
          alt={gift.name}
          className="giftcard-image"
          onError={(e) => (e.target.style.display = "none")}
        />

        {/* PRICE + STATUS */}
        <div className="giftcard-info">
          <p className="giftcard-price">${gift.price}</p>

          <label className="giftcard-status-label">Gift Status</label>

          <select
            className={`gift-status styled-dropdown ${gift.status}`}
            value={gift.status || "No Status"}
            onChange={(e) => onStatusChange(index, e.target.value)}
          >
            <option>Gift Status</option>
            <option>Considering</option>
            <option>Purchased</option>
          </select>
        </div>
      </div>
    </div>
  );
}
