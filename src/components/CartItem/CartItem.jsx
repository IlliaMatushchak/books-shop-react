import { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./CartItem.css";

const CartItem = memo(function CartItem({
  productId,
  quantity,
  book: { price, title },
}) {
  const { changeQuantity, removeFromCart } = useCart();
  const totalPrice = (price * quantity).toFixed(2);

  return (
    <div className="cart-item flex">
      <Link to={`/specific-book/${productId}`}>{title}</Link>
      <span>
        Count: {quantity} / ${totalPrice}
      </span>
      <button
        type="button"
        className="btn-text btn-effect-3d"
        aria-label="Remove from cart"
        onClick={() => {
          removeFromCart(productId);
        }}
      >
        &times;
      </button>
    </div>
  );
});

export default CartItem;
