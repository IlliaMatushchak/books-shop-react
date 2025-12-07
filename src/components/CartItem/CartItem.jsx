import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import LazyImage from "../LazyImage/LazyImage";
import imgNotFound from "../../assets/images/imgNotFound.png";
import "./CartItem.css";

const CartItem = memo(function CartItem({
  productId,
  quantity,
  book: { price, title, image, amount: maxAllowed },
}) {
  const { changeQuantity, removeFromCart, loading } = useCart();
  const [newQuantity, setNewQuantity] = useState(quantity);
  const totalPrice = (price * quantity).toFixed(2);

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  function increment() {
    const newValue = quantity + 1;
    if (newValue > maxAllowed) return;
    changeQuantity(productId, newValue);
  }

  function decrement() {
    const newValue = quantity - 1;
    if (newValue < 1) return;
    changeQuantity(productId, newValue);
  }

  function handleInputChange(e) {
    let newValue = Number(e.target.value);
    setNewQuantity(newValue);
    if (newValue < 1 || newValue > maxAllowed || Number.isNaN(newValue)) {
      return;
    }
    changeQuantity(productId, newValue);
  }

  return (
    <div className="cart-item flex">
      <Link to={`/specific-book/${productId}`}>
        <LazyImage
          className="book-image"
          src={image || imgNotFound}
          alt="Book image"
        />
      </Link>
      <div className="item-info flex">
        <div>
          <Link to={`/specific-book/${productId}`}>{title}</Link>
        </div>
        <div className="price-quantity-container flex">
          <div className="price-block">
            <p>
              Price: <span>{price}$</span>
            </p>
            <p>
              Quantity: <span>{quantity}</span>
            </p>
            <p>
              Total: <span>{totalPrice}$</span>
            </p>
          </div>
          <div className="quantity-block">
            <button
              type="button"
              aria-label="Decrease count of books"
              className="btn-minus btn-effect-3d btn-circle"
              onClick={decrement}
              disabled={loading}
            >
              -
            </button>
            <input
              className="input-quantity"
              type="number"
              required
              step="1"
              min="1"
              max="1000"
              value={newQuantity}
              onChange={handleInputChange}
            />
            <button
              type="button"
              aria-label="Increase count of books"
              className="btn-plus btn-effect-3d btn-circle"
              onClick={increment}
              disabled={loading}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn-remove btn-text btn-effect-3d"
        title="Remove item"
        aria-label="Remove from cart"
        disabled={loading}
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
