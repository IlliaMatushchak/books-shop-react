import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoBackButton.css";

export default function GoBackButton() {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={navigateBack} id="btn-go-back" aria-label="Go to previous page" title="Go back">
      &lt;=
    </button>
  );
}
