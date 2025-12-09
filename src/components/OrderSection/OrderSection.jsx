import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { validateOrderQuantity } from "../../utils/validation/valueValidation";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import Message from "../Message/Message";
import "./OrderSection.css";

function OrderSection({ book }) {
  const { price, amount, id: bookId } = book;
  const { cart, addToCart, loading, error: serverError } = useCart();
  const serverErrorMsg = serverError?.message || "";
  const item = cart.find((el) => el.productId === bookId);
  const isInCart = !!item;
  const countInCart = item?.quantity || 0;
  const maxAllowed = amount - countInCart;
  const [totalCount, setTotalCount] = useState(1);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();
  const { valid: isValid, error: localErrorMsg } = validateOrderQuantity(
    totalCount,
    maxAllowed
  );
  const errorMsg = localErrorMsg || serverErrorMsg;
  const hasError = !!errorMsg;

  useEffect(() => {
    if (hasError && messages?.error !== errorMsg) {
      showMessages({ error: errorMsg }, "error", 8000);
    } else {
      clearMessages();
    }
  }, [hasError, errorMsg]);

  function increment() {
    setTotalCount((prev) => prev + 1);
  }

  function decrement() {
    setTotalCount((prev) => Math.max(prev - 1, 1));
  }

  function handleInputChange(e) {
    let value = Number(e.target.value);
    if (value < 0 || Number.isNaN(value)) {
      value = 0;
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
          value={totalCount === 0 ? "" : totalCount}
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
