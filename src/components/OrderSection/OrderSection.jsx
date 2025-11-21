import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { validateOrderQuantity } from "../../utils/validation/valueValidation";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import Message from "../Message/Message";
import "./OrderSection.css";

function OrderSection({ price, amount, bookID, title }) {
  const { cart, addToCart } = useCart();
  const [totalCount, setTotalCount] = useState(() => {
    const index = cart.findIndex((el) => {
      return el.id === bookID;
    });
    return index === -1 ? 1 : cart[index].orderedCount;
  });
  const { messages, type, showMessages, clearMessages } = useTimedMessages();
  let isValid = !messages.error;

  function validateTotalCount(value) {
    let { valid, error } = validateOrderQuantity(value, amount);
    if (valid) {
      clearMessages();
    } else {
      showMessages({ error }, "error");
    }
  }

  function increment() {
    const newValue = totalCount + 1;
    setTotalCount(newValue);
    validateTotalCount(newValue);
  }

  function decrement() {
    const newValue = totalCount - 1;
    setTotalCount(newValue);
    validateTotalCount(newValue);
  }

  function handleInputChange(e) {
    const value = Number(e.target.value);
    e.target.value = value; // fix problem with 0 before value
    setTotalCount(value);
    validateTotalCount(value);
  }

  function handleAddToCart() {
    addToCart(bookID, totalCount, price, title);
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
          max={amount}
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

      <button
        type="button"
        className="add-button btn-effect-press"
        disabled={!isValid}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </section>
  );
}

export default OrderSection;
