import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import WeatherMap from "../WeatherMap";
import "leaflet/dist/leaflet.css";
import "./../../search/search.css";
import "animate.css";
import { apiKey } from "../../../Api";
import logo from "./../../forecast/images/logo-map1.png";

const Map = ({ location }) => {
  const { city, lat, lon } = location;
  const [time, setTime] = React.useState("");

  // Function to fetch current time
  const fetchCurrentTime = (timezone) => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: timezone,
    });
    return currentTime;
  };

  // Function to fetch time zone
  const fetchTimeZone = (latitude, longitude) => {
    const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          return data.zoneName;
        } else {
          throw new Error("Failed to fetch time zone data");
        }
      });
  };

  React.useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const timezone = await fetchTimeZone(lat, lon);
        const currentTime = await fetchCurrentTime(timezone);
        setTime(currentTime);
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    };

    fetchTimeData();
  }, [lat, lon]);

  return (
    <>
      <div>
        <h2
          className="time-info animate__animated animate__rubberBand"
          style={{ marginLeft: "auto" }}
        >
          {city} Map
        </h2>
        <p className="time-info animate__animated animate__rubberBand">
          Time in {city}: {time}
        </p>

        <WeatherMap city={city} lat={lat} lon={lon} />
      </div>
      <div>
        <Link to="/">
          <BackButton />
        </Link>
      </div>
      <div className="p-container">
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
