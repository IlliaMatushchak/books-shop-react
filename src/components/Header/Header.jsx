import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

const Header = memo(function Header() {
  console.log("Header render");
  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const cartLength = cart.length;

  return (
    <header className="header flex fancy-background">
      <h1>Books shop</h1>
      <nav className="flex">
        {isLoggedIn ? (
          <>
            <Link to="/cart" className="cart-link btn-effect-3d">
              <img src={cartImg} alt="Cart" loading="lazy" />
              {cartLength ? <span>{cartLength}</span> : ""}
            </Link>

            <Link
              to="/"
              className="btn-effect-3d"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>

            <div className="user flex" title="Edit profile">
              <Link to={"/profile"}>
                <img
                  className="user-avatar btn-effect-3d"
                  src={user?.avatar || avatarImg}
                  alt="Avatar"
                  loading="lazy"
                />
              </Link>
              <Link to={"/profile"} className="user-name btn-effect-3d">
                {user?.username}
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="btn-effect-3d">
              Login
            </Link>

            <Link to="/register" className="btn-effect-3d">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
});

export default Header;
