import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import "./Cart.css";
import cartImg from "../../../assets/images/cart.svg";

const Cart = memo(function Cart() {
  console.log("Cart render");
  const { cart, totalPrice, clearCart, removeFromCart } = useCart();
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
          {cart.map(({ productId, quantity, book: { price, title } }) => {
            return (
              <div key={productId} className="product-info flex">
                <Link to={`/specific-book/${productId}`}>{title}</Link>
                <span>
                  Count: {quantity} / ${(price * quantity).toFixed(2)}
                </span>
                <button
                  type="button"
                  className="btn-text btn-effect-3d"
                  aria-label="Remove from cart"
                  onClick={() => {
                    removeFromCart(productId);
                  }}
                >
                  &times;
                </button>
              </div>
            );
          })}
          <p className="total-price">Total price, ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
});

export default Cart;
