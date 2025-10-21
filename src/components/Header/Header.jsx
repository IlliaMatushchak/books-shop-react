import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useAvatar } from "../../contexts/AvatarContext";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

const Header = memo(function Header() {
  console.log("Header render");
  const { cart } = useCart();
  const { avatar } = useAvatar();
  const { userName, setUserName, isLoggedIn, setIsLoggedIn } = useAuth();
  const cartLength = cart.length;

  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>

        {isLoggedIn && (
          <nav className="flex">
            <Link to="/cart" className="cart-link btn-effect-3d">
              <img src={cartImg} alt="Cart" loading="lazy" />
              {cartLength ? <span>{cartLength}</span> : ""}
            </Link>

            <Link
              to="/"
              className="btn-effect-3d"
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
                  className="user-avatar btn-effect-3d"
                  src={avatar || avatarImg}
                  alt="Avatar"
                  loading="lazy"
                />
              </Link>
              <Link to={"/"} className="user-name btn-effect-3d">
                {userName}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
});

export default Header;
