import React, { useState, useEffect } from "react";
import "./forecast.css";
import queryString from "query-string";

// import Footer from "../footer/footer";
import {FooterWithSocialLinks} from "../footer/FooterWithSocialLinks"

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
      <label className="title">Map Precipitation</label>
      <div className="map-container">
        <iframe
          title="Weather Map"
          className="map-iframe"
          src={mapUrl}
          frameBorder="0"
        ></iframe>
      </div>
      <div className="for-gap-purpose"></div>

      
      {/* <Footer /> */}
      <FooterWithSocialLinks/>
      

      <span className="attribution-container">Made with ReactJS</span>
      <img className="logo_img" src="./logo192.png" alt="" />
    </div>
  );
}

export default MapForcaste;
