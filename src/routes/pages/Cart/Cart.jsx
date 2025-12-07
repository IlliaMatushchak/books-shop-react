import { memo } from "react";
import { useCart } from "../../../contexts/CartContext";
import CartItemsList from "../../../containers/CartItemsList/CartItemsList";
import EmptyCart from "../../../components/EmptyCart/EmptyCart";
import "./Cart.css";

const Cart = memo(function Cart() {
  const { totalPrice, totalCount, clearCart, loading } = useCart();
  const isEmpty = totalCount === 0;

  return isEmpty ? (
    <EmptyCart />
  ) : (
    <div className="cart-container fancy-background">
      <button
        type="button"
        className="btn-clear-cart btn-effect-press"
        onClick={clearCart}
        disabled={loading}
      >
        Clear cart
      </button>
      <CartItemsList />
      <p className="total-price">
        Total price: <span>{totalPrice.toFixed(2)}$</span>
      </p>
    </div>
  );
});

export default Cart;
