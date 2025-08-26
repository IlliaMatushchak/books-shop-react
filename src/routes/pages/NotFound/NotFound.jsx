import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="error-info-container fancy-background">
      <h1>This page does not exist!</h1>
      <p>Try to choose another page or return back</p>
      <Link to="/" className="a-like-btn btn-effect-press">
        Main page
      </Link> 
    </div>
  );
}

export default NotFound;
