import "./CartModal.css";
import CartItem from "../CartItem/CartItem";
function CartModal({ activeModal, items, onClose }) {
  if (items.length === 0) return;
  const cart = items.map((item) => {
    console.log(item);
    return <CartItem key={item._id} item={item} />;
  });

  return (
    <div className={`modal ${activeModal === "view_cart" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
        ></button>
        <section className="cart-items">
          <ul className="cart-items__list">{cart}</ul>
        </section>
      </div>
    </div>
  );
}

export default CartModal;
