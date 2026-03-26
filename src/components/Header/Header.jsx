import { memo } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";
import CartIcon from "../CartIcon/CartIcon";
import "./Header.css";
import avatarImg from "../../assets/images/avatar.png";
import { ROLES } from "../../constants/roles";

const getNavLinkFunc = (className) => {
  return ({ isActive }) => (isActive ? `active ${className}` : className);
};

const Header = memo(function Header() {
  const { user, isLoggedIn, logout, loading } = useAuth();

  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>
        <nav className="flex">
          {user?.role?.toUpperCase() === ROLES.ADMIN && (
            <NavLink to={ROUTES.ADMIN} className={getNavLinkFunc("btn-effect-3d")}>
              Admin-panel
            </NavLink>
          )}
          <NavLink to={ROUTES.SHOP} className={getNavLinkFunc("btn-effect-3d")}>
            Shop
          </NavLink>
          <CartIcon />
          {isLoggedIn ? (
            <>
              <button onClick={logout} className="btn-text btn-effect-3d">
                Logout
              </button>

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
