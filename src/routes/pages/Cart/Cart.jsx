import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import "./Cart.css";
import cartImg from "../../../assets/images/cart.svg";

const Cart = memo(function Cart() {
  console.log("Cart render");
  const { cart, clearCart, removeFromCart } = useCart();
  const isEmpty = !cart.length;

  return (
    <div className="cart fancy-background">
      <button
        type="button"
        className="btn-purchase btn-effect-press"
        onClick={clearCart}
        disabled={isEmpty}
      >
        Purchase
      </button>

      {isEmpty ? (
        <div className="empty-cart-container">
          <img src={cartImg} alt="Empty cart" loading="lazy" />
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
                <button
                  type="button"
                  className="btn-text btn-effect-3d"
                  aria-label="Remove from cart"
                  onClick={() => {
                    removeFromCart(id);
                  }}
                >
                  &times;
                </button>
              </div>
            );
          })}
          <p className="total-price">
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
});

export default Cart;
