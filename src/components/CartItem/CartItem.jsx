import "./CartItem.css";
function CartItem({ item }) {
  return (
    <li className="cart-item">
      <img src={item.link} alt="" className="cart-item__image" />
      <h2 className="cart-item__name">{item.name}</h2>
    </li>
  );
}

export default CartItem;
