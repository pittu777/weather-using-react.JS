import React from "react";
import BackButton from "../BackButton/BackButton";
import WeatherMap from "../WeatherMap";

const Map = ({ location }) => {
  const { city, lat, lon } = location;

  return (
    <>
      <div>
        <h2 style={{ marginLeft: "90px" }}>{city} Map</h2>
        <WeatherMap city={city} lat={lat} lon={lon} />
      </div>
      <div>
        <BackButton />
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
