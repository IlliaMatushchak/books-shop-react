import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "../../assets/styles/Cart.css";
import cartImg from "../../assets/images/cart.svg";

function Cart() {
  const { cart, setCart } = useCart();
  const isEmpty = !cart.length;

  return (
    <div className="cart fancy-background">
      <button
        className="btn-purchase"
        onClick={() => {
          setCart([]);
        }}
        disabled={isEmpty}
      >
        Purchase
      </button>

      {isEmpty ? (
        <div className="empty-cart-container">
          <img src={cartImg} alt="Empty cart" />
          <p>Cart is empty!</p>
        </div>
      ) : (
        <>
          {cart.map(({ id, orderedCount, price, title }) => {
            return (
              <div key={id} className="product-info flex">
                <Link to={`/specific-book/${id}`}>{title}</Link>
                <span>
                  Count: {orderedCount} / ${(price * orderedCount).toFixed(2)}
                </span>
              </div>
            );
          })}
          <p>
            Total price, $
            {cart
              .reduce(
                (acc, { orderedCount, price }) => acc + orderedCount * price,
                0
              )
              .toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}

export default Cart;
