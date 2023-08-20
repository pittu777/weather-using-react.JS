import React, { useState, useEffect } from "react";
import "./PopUp.css"; // You can create a CSS file for styling

const PopupMessage = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }, []);

  return (
    <div className={`popup ${showPopup ? "show" : ""}`}>
      <p>Hello, I'm Pittu!</p>
    </div>
  );
};

export default PopupMessage;
