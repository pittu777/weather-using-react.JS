import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import WeatherMap from "../WeatherMap";
import "leaflet/dist/leaflet.css";
import "./../../search/search.css";

const Map = ({ location, searchTime }) => {
  const { city, lat, lon } = location;
  console.log("time :" + searchTime);

  return (
    <>
      <div>
        <h2 style={{ marginLeft: "90px" }}>{city} Map</h2>
        <p className="time-info">
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
