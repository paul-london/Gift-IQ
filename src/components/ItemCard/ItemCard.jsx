import "./ItemCard.css";
function ItemCard({ item, onItemClick, recipient, onLikeItem }) {
  const handleItemClick = () => {
    onItemClick(item);
  };

  function handleLikeItem(e) {
    onLikeItem(e.target.checked, item, recipient);
  }
  return (
    <li className="item">
      <div className="item__image-container">
        <img
          onClick={handleItemClick}
          className="item__image"
          src={item.link}
          alt={`${item.name} image`}
        />
        <input
          className="item__like-btn"
          id={item._id}
          //value={isLiked}
          //checked={isLiked}
          type="checkbox"
          onChange={handleLikeItem}
        />
      </div>
      <div className="item__content">
        <h2 className="item__name">{item.name}</h2>
        <p className="item__description">{item.description}</p>
        <p className="item__price">${item.price}</p>
      </div>
    </li>
  );
}

export default ItemCard;
