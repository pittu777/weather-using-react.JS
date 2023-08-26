import React, { useState, useEffect } from "react";
import "./forecast.css";
import queryString from "query-string";
import logo from "./logo-open.png";
import wind from "./wind.png";
import time from "./logo-time.png";

function MapForcaste({ selectedCity }) {
  const [coordinates, setCoordinates] = useState({ lat: 12.191, lon: 85.748 });

  useEffect(() => {
    if (selectedCity) {
      const [lat, lon] = selectedCity.value.split(" ");
      setCoordinates({ lat, lon });
    }
  }, [selectedCity]);

  const mapUrl = queryString.stringifyUrl({
    url: "https://embed.windy.com/embed2.html",
    query: {
      lat: coordinates.lat,
      lon: coordinates.lon,
      detailLat: coordinates.lat,
      detailLon: coordinates.lon,
      width: 650,
      height: 450,
      zoom: 5,
      level: "surface",
      overlay: "wind",
      product: "ecmwf",
      menu: "",
      message: "",
      marker: [coordinates.lat, coordinates.lon].join(","),
      calendar: "now",
      pressure: "",
      type: "map",
      location: "coordinates",
      detail: "",
      metricWind: "default",
      metricTemp: "default",
      radarRange: -1,
    },
  });

  return (
    <div>
      <div className="map-container">
        <iframe
          title="Weather Map"
          className="map-iframe"
          src={mapUrl}
          frameBorder="0"
        ></iframe>
      </div>

      <span className="attribution-container">
            powered by <br />
          </span>

      <footer className="footer">
      
        <div className="footer-box">
          
          <p className="body-3">
            <a
              href="https://openweather.org/api"
              rel="noreferrer"
              target="_blank"
            >
              <img src={logo} alt="" width={150} height={30} loading="lazy" />
            </a>
          </p>
          <p className="body-3">
            <a href="https://www.windy.com/" rel="noreferrer" target="_blank">
              <img src={wind} alt="" width={150} height={30} loading="lazy" />
            </a>
          </p>
          <p className="body-3">
            <a href="https://timezonedb.com/" rel="noreferrer" target="_blank">
              <img src={time} alt="" width={150} height={30} loading="lazy" />
            </a>
          </p>
        </div>
      </footer>
      <span className="attribution-container">Made with ReactJS</span>
    </div>
  );
}

export default MapForcaste;
