import React from "react";
import { useNavigate } from "react-router-dom";
import "./back.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <button className="button" onClick={handleBackButtonClick}>
      Back
    </button>
  );
};

export default BackButton;
