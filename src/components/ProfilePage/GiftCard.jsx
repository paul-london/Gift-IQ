export default function GiftCard({ gift, index, onStatusChange, onDelete }) {
  return (
    <div className="gift-card">
      <h4>{gift.name}</h4>
      <p>${gift.price}</p>
      <a href={gift.link} target="_blank">View</a>
      <p>{gift.description}</p>

      <select
        value={gift.status}
        onChange={(e) => onStatusChange(index, e.target.value)}
      >
        <option value="none">Not chosen</option>
        <option value="considering">Considering</option>
        <option value="purchased">Purchased</option>
      </select>

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}
