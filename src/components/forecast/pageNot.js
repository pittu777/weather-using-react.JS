import React, { useEffect, useState } from "react";
import "./forecast.css"; // Import your CSS file

const NotFound = () => {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots === "..." ? "" : prevDots + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <h1>Loading{dots}</h1>
    </div>
  );
};

export default NotFound;
