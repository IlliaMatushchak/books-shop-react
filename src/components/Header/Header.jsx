import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

function Header({
  userName = "NoName",
  setUserName,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const { cart } = useCart();
  const cartLength = cart.length;

  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>

        {isLoggedIn && (
          <nav className="flex">
            <Link to="/cart" className="cart-link">
              <img src={cartImg} alt="Cart" />
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
                  alt="Avatar"
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
