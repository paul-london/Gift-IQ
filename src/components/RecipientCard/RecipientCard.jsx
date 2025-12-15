import "./RecipientCard.css";
import avatar from "../../assets/images/avatarPH.jpg";

function RecipientCard({ recipient, onRecipientClick, onRecipientDelete }) {
  const handleRecipientClick = () => {
    onRecipientClick(recipient);
  };
  function handleDeleteRecipient() {
    onRecipientDelete(recipient);
  }

  return (
    <li className="recipient">
      <img src={avatar} alt="" className="recipient__img" />
      <h2 className="recipient__name">{recipient.name}</h2>
      <div className="recipient__gift"></div>
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
