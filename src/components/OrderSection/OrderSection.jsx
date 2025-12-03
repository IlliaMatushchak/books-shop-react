import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { validateOrderQuantity } from "../../utils/validation/valueValidation";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import Message from "../Message/Message";
import "./OrderSection.css";

function OrderSection({ book }) {
  const { price, amount, id: bookId } = book;
  const { cart, addToCart, loading } = useCart();
  const item = cart.find((el) => el.productId === bookId);
  const isInCart = !!item;
  const countInCart = item?.quantity || 0;
  const maxAllowed = amount - countInCart;
  const [totalCount, setTotalCount] = useState(1);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();
  const { valid, error } = validateOrderQuantity(totalCount, maxAllowed);
  const isValid = valid;

  useEffect(() => {
    if (isValid) {
      clearMessages();
    } else {
      showMessages({ error }, "error");
    }
  }, [isValid, error]);

  function increment() {
    const newValue = totalCount + 1;
    setTotalCount(newValue);
  }

  function decrement() {
    if (totalCount <= 1) return;
    const newValue = totalCount - 1;
    setTotalCount(newValue);
  }

  function handleInputChange(e) {
    let value = Number(e.target.value);
    // e.target.value = value; // fix problem with 0 before value
    if (value < 1 || Number.isNaN(value)) {
      value = 1;
    }
    setTotalCount(value);
  }

  function handleAddToCart() {
    if (!isValid) return;
    addToCart(bookId, totalCount, book);
    setTotalCount(1);
  }

  return (
    <section className="order-section fancy-background">
      <div>
        <p className="price-paragr">Price, $</p>
        <p className="price">{price}</p>
      </div>
      <div>
        <label className="count-label" htmlFor="count">
          Count
        </label>
        <button
          type="button"
          aria-label="Increase count of books"
          className="btn-plus btn-effect-3d btn-circle"
          onClick={increment}
        >
          +
        </button>
        <input
          name="count"
          className={isValid ? "count" : "count invalid-field"}
          id="count"
          type="number"
          required
          step="1"
          min="1"
          max={maxAllowed}
          value={totalCount}
          onChange={handleInputChange}
        />
        <button
          type="button"
          aria-label="Decrease count of books"
          className="btn-minus btn-effect-3d btn-circle"
          onClick={decrement}
        >
          -
        </button>
      </div>
      <div>
        <p className="total-price-paragr">Total price</p>
        <p className="total-price">
          {isValid ? (
            (price * totalCount).toFixed(2)
          ) : (
            <span className="invalid-text">Error</span>
          )}
        </p>
      </div>
      {messages?.error && <Message message={messages.error} type={type} />}
      {isInCart && (
        <Message message={`Already in cart: ${countInCart}`} type="success" />
      )}
      <button
        type="button"
        className="add-button btn-effect-press"
        disabled={!isValid || loading}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </section>
  );
}

export default OrderSection;
