import { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

const Header = memo(function Header() {
  const { totalCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="header flex fancy-background">
      <h1>Books shop</h1>
      <nav className="flex">
        <Link to="/shop" className="btn-effect-3d">
          Shop
        </Link>
        <Link to="/cart" className="cart-link btn-effect-3d">
          <img src={cartImg} alt="Cart" loading="lazy" />
          {totalCount ? <span>{totalCount}</span> : ""}
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/"
              className="btn-effect-3d"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>

            <Link to={"/profile"} className="profile-link" title="Edit profile">
              <img
                className="user-avatar btn-effect-3d"
                src={user?.avatar || avatarImg}
                alt="Avatar"
                loading="lazy"
              />
              <span className="user-name btn-effect-3d">{user?.username}</span>
            </Link>
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
