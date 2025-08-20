import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

function Header() {
  const { cart } = useCart();
  const { userName, setUserName, isLoggedIn, setIsLoggedIn } = useAuth();
  const cartLength = cart.length;

  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>

        {isLoggedIn && (
          <nav className="flex">
            <Link to="/cart" className="cart-link">
              <img src={cartImg} alt="Cart" loading="lazy" />
              {cartLength ? <span>{cartLength}</span> : ""}
            </Link>

            <Link
              to="/"
              onClick={() => {
                setUserName("");
                setIsLoggedIn(false);
              }}
            >
              Sign-out
            </Link>

            <div className="user flex">
              <Link to={"/"}>
                <img
                  className="user-avatar"
                  src={avatarImg}
                  alt="User avatar"
                  loading="lazy"
                />
              </Link>
              <Link to={"/"} className="user-name">
                {userName}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
