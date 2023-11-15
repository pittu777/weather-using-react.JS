import React from "react";
import { useNavigate } from "react-router-dom";
import "./back.css";
import { Button } from "@material-tailwind/react";


const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    // <button className="button" onClick={handleBackButtonClick}>
    //   Back
    // </button>
    <>
    <Button className="button" onClick={handleBackButtonClick} >
      back
    </Button>
    
    </>
    
  );
};

export default BackButton;
