import "../assets/styles/OrderSection.css";

function OrderSection({ bookID, price }) {
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
        <button className="btn-plus">+</button>
        <input
          name="count"
          className="count"
          id="count"
          type="number"
          required
          step="1"
          min="1"
        />
        <button className="btn-minus">-</button>
      </div>

      <div>
        <p className="total-price-paragr">Total price</p>
        <p className="total-price">120</p>
      </div>

      <button className="add-button">Add to cart</button>
    </section>
  );
}

export default OrderSection;
