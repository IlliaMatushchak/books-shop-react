import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useCart } from "../../contexts/CartContext";
import cartImg from "../../assets/images/cart.svg";
import "./CartIcon.css";

function CartIcon() {
  const { totalCount } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (totalCount === 0) return;
    setAnimateCart(true);
    const timer = setTimeout(() => setAnimateCart(false), 300);
    return () => clearTimeout(timer);
  }, [totalCount]);

  return (
    <NavLink
      to={ROUTES.CART}
      className={({ isActive }) =>
        `cart-link btn-effect-3d ${animateCart ? "cart-jump" : ""} ${isActive ? "active" : ""}`
      }
    >
      <img src={cartImg} alt="Cart" loading="lazy" />
      {totalCount > 0 && <span>{totalCount}</span>}
    </NavLink>
  );
}

export default CartIcon;
