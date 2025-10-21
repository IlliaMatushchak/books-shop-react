import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import "./OrderSection.css";

function OrderSection({ price, amount, bookID, title }) {
  const { cart, addToCart } = useCart();
  const [isValid, setIsValid] = useState(true);
  const [totalCount, setTotalCount] = useState(() => {
    const index = cart.findIndex((el) => {
      return el.id === bookID;
    });

    return index === -1 ? 1 : cart[index].orderedCount;
  });

  function handleAddToCart() {
    addToCart(bookID, totalCount, price, title);
  }

  function validateTotalCount(count) {
    if (count > 0 && count <= amount) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function handleChangeTotalCount(e) {
    const operator = e.target.innerText;
    const value = +e.target.value;
    e.target.value = value;

    if (operator === "+") {
      setTotalCount((prev) => prev + 1);
      validateTotalCount(totalCount + 1);
    } else if (operator === "-") {
      setTotalCount((prev) => prev - 1);
      validateTotalCount(totalCount - 1);
    } else {
      setTotalCount(value);
      validateTotalCount(value);
    }
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
          onClick={handleChangeTotalCount}
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
          value={totalCount}
          onInput={handleChangeTotalCount}
        />
        <button
          type="button"
          aria-label="Decrease count of books"
          className="btn-minus btn-effect-3d btn-circle"
          onClick={handleChangeTotalCount}
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
