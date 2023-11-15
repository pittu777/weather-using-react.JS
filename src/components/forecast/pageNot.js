import React, { useEffect, useState } from "react";
import "./forecast.css"; // Import your CSS file
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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
    // <div className="loading-container">
    //   <h1 className="loading-h1">page not found go back {dots}</h1>
    // </div>
    <>
    <div className="not-found">
      <h1 className="not-found-h1">404 - Page Not Found{dots}</h1>
      <p className="not-found-p">Sorry, the page does not exist{dots}</p>
    </div>
    <Link to="/">
    <Button className="button">BACK</Button>
    </Link>
</>
  );
};

export default NotFound;


