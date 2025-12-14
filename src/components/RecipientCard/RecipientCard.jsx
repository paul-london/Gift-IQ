import "./RecipientCard.css";
function RecipientCard({ recipient, onRecipientClick, onRecipientDelete }) {
  const handleRecipientClick = () => {
    onRecipientClick(recipient);
  };
  function handleDeleteRecipient() {
    onRecipientDelete(recipient);
  }

  return (
    <li className="recipient">
      <img src="#" alt="" className="recipient__img" />
      <h2 className="recipient__name">{recipient.name}</h2>
      <p className="recipient__gifts-number">
        Gifts/{recipient.products.length}
      </p>
      <div className="recipient__content">
        <button onClick={handleRecipientClick} className="recipient__btn">
          Find Gifts
        </button>
        <button onClick={handleDeleteRecipient} className="recipient__btn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default RecipientCard;
