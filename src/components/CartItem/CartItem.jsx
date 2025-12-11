import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import { validateOrderQuantity } from "../../utils/validation/valueValidation";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import imgNotFound from "../../assets/images/imgNotFound.png";
import "./CartItem.css";

const CartItem = memo(function CartItem({
  productId,
  quantity,
  book: { price, title, image, amount: maxAllowed },
}) {
  const {
    changeQuantity,
    removeFromCart,
    loading,
    error: serverError,
  } = useCart();
  const serverErrorMsg = serverError?.message || "";
  const [newQuantity, setNewQuantity] = useState(quantity);
  const totalPrice = (price * quantity).toFixed(2);
  const debouncedNewQuantity = useDebouncedValue(newQuantity, 1000);
  const { valid: isValid, error: localErrorMsg } = validateOrderQuantity(
    debouncedNewQuantity,
    maxAllowed
  );
  const { messages, type, showMessages, clearMessages } = useTimedMessages();
  const errorMsg = localErrorMsg || serverErrorMsg;
  const hasError = !!errorMsg;

  useEffect(() => {
    if (hasError && messages?.error !== errorMsg) {
      showMessages({ error: errorMsg }, "error", 8000);
    } else {
      clearMessages();
    }
  }, [hasError, errorMsg]);

  useEffect(() => {
    if (debouncedNewQuantity === quantity) return;
    if (!isValid) return;
    changeQuantity(productId, debouncedNewQuantity);
  }, [debouncedNewQuantity, quantity, isValid]);

  function increment() {
    setNewQuantity((prev) => prev + 1);
  }

  function decrement() {
    setNewQuantity((prev) => prev - 1);
  }

  function handleInputChange(e) {
    let newValue = Number(e.target.value);
    setNewQuantity(newValue);
  }

  return (
    <div className="cart-item flex">
      <Link to={`/specific-book/${productId}`} className="img-container">
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
        {messages?.error && <Message message={messages.error} type={type} />}
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
              className={
                isValid ? "input-quantity" : "input-quantity invalid-field"
              }
              type="number"
              required
              step="1"
              min="1"
              max="1000"
              value={newQuantity === 0 ? "" : newQuantity}
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
      {loading && <Loader className="cart-item-loader" type="small" />}
    </div>
  );
});

export default CartItem;
