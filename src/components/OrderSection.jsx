import { useState } from "react";
import "../assets/styles/OrderSection.css";

function OrderSection({ bookID, price, amount }) {
  const [totalCount, setTotalCount] = useState(1);
  const [isValid, setIsValid] = useState(true);

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
        <button className="btn-plus" onClick={handleChangeTotalCount}>
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
        <button className="btn-minus" onClick={handleChangeTotalCount}>
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

      <button className="add-button" disabled={!isValid}>
        Add to cart
      </button>
    </section>
  );
}

export default OrderSection;
