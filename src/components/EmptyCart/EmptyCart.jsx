import { memo } from "react";
import { Link } from "react-router-dom";
import cartImg from "../../assets/images/cart.svg";
import "./EmptyCart.css";

const EmptyCart = memo(function EmptyCart() {
  return (
    <div className="empty-cart-container fancy-background">
      <h2>Cart is empty!</h2>
      <img src={cartImg} alt="Empty cart" loading="lazy" />
      <Link to="/shop" className="a-like-btn btn-effect-press">
        Go to Shop
      </Link>
    </div>
  );
});

export default EmptyCart;
