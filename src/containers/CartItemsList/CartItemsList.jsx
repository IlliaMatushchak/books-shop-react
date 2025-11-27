import { memo } from "react";
import { useCart } from "../../contexts/CartContext";
import CartItem from "../../components/CartItem/CartItem";

const CartItemsList = memo(function CartItemsList() {
  const { cart } = useCart();
  return (
    <section className="cart-items-list">
      {cart.map((el) => {
        return <CartItem key={el.productId} {...el} />;
      })}
    </section>
  );
});

export default CartItemsList;
