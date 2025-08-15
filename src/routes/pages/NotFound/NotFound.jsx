import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="error-info-container fancy-background">
      <p>
        Try to choose another page. <br />
        <span>This page does not exist!</span>
      </p>
      <Link to="/">Go to main page...</Link>
    </div>
  );
}

export default NotFound;
