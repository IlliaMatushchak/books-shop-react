import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoBackButton.css";

export default function GoBackButton() {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={navigateBack} id="btn-go-back" className="btn-fixed btn-circle btn-effect-shadow" aria-label="Go to previous page" title="Go back">
      &lt;=
    </button>
  );
}
