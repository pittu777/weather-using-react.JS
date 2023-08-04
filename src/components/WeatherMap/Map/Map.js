import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import WeatherMap from "../WeatherMap";
import "leaflet/dist/leaflet.css";

const Map = ({ location, temp }) => {
  const { city, lat, lon } = location;

  return (
    <>
      <div>
        <h2 style={{ marginLeft: "90px" }}>{city} Map</h2>
        <WeatherMap city={city} lat={lat} lon={lon} />
      </div>
      <div>
        <Link to="/">
          <BackButton />
        </Link>
      </div>
      <div className="p-container">
        <p className="p-tag">
          provided by{" "}
          <span>
            <a href="https://leafletjs.com/">leaflet</a>
          </span>
        </p>
      </div>
    </>
  );
};

export default Map;
