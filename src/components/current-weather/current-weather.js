import React from "react";
import { Link } from "react-router-dom";

import "./current-weather.css";

function CurrentWeather({ data }) {
  const getTimeZoneOffset = (timezoneInSeconds) => {
    const offsetHours = Math.floor(timezoneInSeconds / 3600);
    const offsetMinutes = Math.abs(Math.floor((timezoneInSeconds % 3600) / 60));

    const sign = offsetHours >= 0 ? "+" : "-";
    return `${sign}${Math.abs(offsetHours)}:${String(offsetMinutes).padStart(
      2,
      "0"
    )}`;
  };
  console.log(data);

  return (
    <>
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-disc">{data.weather[0].description}</p>
          </div>
          <img
            src={`icons/${data.weather[0].icon}.png`}
            alt="weather"
            className="weather-icon"
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">timezone</span>
              <span className="parameter-value">
                {getTimeZoneOffset(data.timezone)} UTC
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">sunrise</span>
              <span className="parameter-value">
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">sunset</span>
              <span className="parameter-value">
                {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
        {/* Remove the WeatherMap component from here */}
        <div className="show-map-button">
          <Link to="/map">
            <button className="button">Show Map</button>
          </Link>
          <Link to="/weatherMap">
            <button className="button">Show weather map</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
