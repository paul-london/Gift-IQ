import "./RecipientCard.css";
function RecipientCard({ recipient, onRecipientClick }) {
  const handleRecipientClick = () => {
    onRecipientClick(recipient);
  };

  return (
    <li className="recipient">
      <h2 className="recipient__name">{recipient.name}</h2>
      <p className="recipient__group">{recipient.group}</p>
      <p className="recipient__price-range">{recipient.priceRange}</p>
      <p className="recipient__gifts-number">{recipient.products.length}</p>
      <button onClick={handleRecipientClick} className="recipient__view-btn">
        Recommended Gifts
      </button>
    </li>
  );
}

export default RecipientCard;
