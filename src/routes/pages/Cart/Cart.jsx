import { memo } from "react";
import { useCart } from "../../../contexts/CartContext";
import "./Cart.css";
import cartImg from "../../../assets/images/cart.svg";
import CartItemsList from "../../../containers/CartItemsList/CartItemsList";

const Cart = memo(function Cart() {
  const { totalPrice, totalCount, clearCart, loading } = useCart();
  const isEmpty = totalCount === 0;

  return (
    <div className="cart fancy-background">
      <button
        type="button"
        className="btn-purchase btn-effect-press"
        onClick={clearCart}
        disabled={isEmpty || loading}
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
          <CartItemsList />
          <p className="total-price">
            Total price: <span>${totalPrice.toFixed(2)}</span>
          </p>
        </>
      )}
    </div>
  );
});

export default Cart;
