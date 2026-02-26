import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";
import "./Header.css";
import cartImg from "../../assets/images/cart.svg";
import avatarImg from "../../assets/images/avatar.png";

const Header = memo(function Header() {
  const { totalCount } = useCart();
  const { user, isLoggedIn, logout, loading } = useAuth();

  const getNavLinkFunc = (className) => {
    return ({ isActive }) => (isActive ? `active ${className}` : className);
  };

  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>
        <nav className="flex">
          <NavLink to={ROUTES.SHOP} className={getNavLinkFunc("btn-effect-3d")}>
            Shop
          </NavLink>
          <NavLink to={ROUTES.CART} className={getNavLinkFunc("cart-link btn-effect-3d")}>
            <img src={cartImg} alt="Cart" loading="lazy" />
            {totalCount ? <span>{totalCount}</span> : ""}
          </NavLink>

          {isLoggedIn ? (
            <>
              <Link to={ROUTES.HOME} className="btn-effect-3d" onClick={logout}>
                Logout
              </Link>

              <NavLink
                to={ROUTES.PROFILE}
                className={getNavLinkFunc("profile-link")}
                title="Edit profile"
              >
                <img
                  className="user-avatar btn-effect-3d"
                  src={user?.avatar || avatarImg}
                  alt="Avatar"
                  loading="lazy"
                />
                <span className="user-name btn-effect-3d">{user?.username}</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.HOME} className={getNavLinkFunc("btn-effect-3d")}>
                Login
              </NavLink>

              <NavLink to={ROUTES.REGISTER} className={getNavLinkFunc("btn-effect-3d")}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>
      {loading && <Loader type="global" />}
    </>
  );
});

export default Header;
