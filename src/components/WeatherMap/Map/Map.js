import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import WeatherMap from "../WeatherMap";
import "leaflet/dist/leaflet.css";
import "./../../search/search.css";
import "animate.css";
import logo from "./../../forecast/images/logo-map1.png"

const Map = ({ location, searchTime }) => {
  const { city, lat, lon } = location;
  console.log("time :" + searchTime);

  return (
    <>
      <div>
        <h2 className="time-info animate__animated animate__rubberBand" style={{ marginLeft: "auto" }}>{city} Map</h2>
        <p className="time-info animate__animated animate__rubberBand">
          Time in {city}: {searchTime}
        </p>
        <WeatherMap city={city} lat={lat} lon={lon} />
      </div>
      <div>
        <Link to="/">
          <BackButton />
        </Link>
      </div>
      <div className="p-container">
        {/* <p className="p-tag">
          provided by{" "}
          <span>
            <a href="https://leafletjs.com/">leaflet</a>
          </span>
        </p> */}
        <span>powered by</span>
        <p className="body-3">
          
           <a href="https://leafletjs.com/" rel="noreferrer" target="_blank">
            <img src={logo} alt="" width={150} height={30} loading="lazy" />
          </a>
        </p>
      </div>
    </>
  );
};

export default Map;
