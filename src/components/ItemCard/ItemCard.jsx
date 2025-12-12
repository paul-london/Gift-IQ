import "./ItemCard.css";
function ItemCard({ item, onItemClick, onAddItem }) {
  const handleItemClick = () => {
    onItemClick(item);
  };
  let quantity = 1;
  function updateQuantity(e) {
    if (e.target.value && e.target.value > 0) {
      quantity = e.target.value;
    }
  }
  function handleAddToCart() {
    onAddItem(item, quantity);
  }
  return (
    <li className="item">
      <img
        onClick={handleItemClick}
        className="item__image"
        src={item.link}
        alt={`${item.name} image`}
      />
      <h2 className="item__name">{item.name}</h2>
      <div className="item__content">
        <p className="item__description">{item.description}</p>
        <p className="item__price">${item.price}</p>
        <button type="button" class="item__like-btn"></button>
        <label htmlFor="quantity" className="item__label">
          Quantity:
          <input
            type="number"
            min="1"
            max="50"
            className="item__input"
            id="quantity"
            defaultValue="1"
            onChange={updateQuantity}
          />
        </label>
        <button onClick={handleAddToCart} className="item__add-btn">
          Add to cart
        </button>
      </div>
    </li>
  );
}

export default ItemCard;
