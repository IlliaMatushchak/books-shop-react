import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Header.css";
import cartImg from "../assets/images/cart.svg";
import avatarImg from "../assets/images/avatar.png";

function Header({ userName = "NoName" }) {
  return (
    <>
      <header className="header flex fancy-background">
        <h1>Books shop</h1>

        <nav className="flex">
          <Link to="/cart" className="cart-link">
            <img src={cartImg} width="50px" alt="Cart" />
            <span>5</span>
          </Link>

          <Link to="/">Sign-out</Link>

          <div className="user flex">
            <Link to={"/"}>
              <img
                className="user-avatar"
                src={avatarImg}
                width="50px"
                alt="Avatar"
              />
            </Link>
            <Link to={"/"} className="user-name">
              {userName}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
