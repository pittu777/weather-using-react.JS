import React, { useState, useEffect } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import "./forecast.css";
import "./../search/search.css";
import BackButton from "../WeatherMap/BackButton/BackButton";

// You can import your loading GIF or use an image URL
import loadingGif from "./loader.gif";

function Hourly({ city, apiKey }) {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setHourlyForecast(data.list);
        setLoading(false); // Data has loaded, set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [city, apiKey]);

  const getWeatherIcon = (weather) => {
    // Define the mapping of weather conditions to icons
    const weatherIcons = {
      Clear: <WiDaySunny />,
      Clouds: <WiCloud />,
      Rain: <WiRain />,
      Snow: <WiSnow />,
      Thunderstorm: <WiThunderstorm />,
    };

    // Return the corresponding icon or a default icon
    return weatherIcons[weather] || <WiCloud />;
  };

  return (
    <div className="hourly-container">
      <h1 className="hourly-title">Hourly Weather Forecast for {city}</h1>
      {loading ? (
        // Show loading GIF while data is being fetched
        <div className="loading-indicator">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        // Show hourly forecast data once loaded
        <div>
          <div>
            <BackButton />
          </div>
          {hourlyForecast.map((forecast, index) => (
            <div className="hourly-item" key={index}>
              <p>
                Time:{" "}
                {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Weather: {forecast.weather[0].description}</p>
              <p>Wind Speed: {forecast.wind.speed} m/s</p>
              <div className="weather-icon">
                {getWeatherIcon(forecast.weather[0].main)}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hourly;
