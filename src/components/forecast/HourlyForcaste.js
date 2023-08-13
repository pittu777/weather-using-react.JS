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
import loadingGif from "./loader.gif";
function Hourly({ city, apiKey }) {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setHourlyForecast(data.list);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [city, apiKey]);
  const getWeatherIcon = (weather) => {
    const weatherIcons = {
      Clear: <WiDaySunny size={64} />,
      Clouds: <WiCloud size={64} />,
      Rain: <WiRain size={64} />,
      Snow: <WiSnow size={64} />,
      Thunderstorm: <WiThunderstorm size={64} />,
    };
    return weatherIcons[weather] || <WiCloud size={64} />;
  };
  return (
    <div className="hourly-container1">
      <h1 className="hourly-title1">Hourly Weather Forecast for {city}</h1>
      {loading ? (
        <div className="loading-indicator">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div>
          <div>
            <BackButton />
          </div>
          <div className="hourly-items1">
            {hourlyForecast.map((forecast, index) => (
              <div className="hourly-item1" key={index}>
                <p className="time1">
                  {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <div className="weather-icon1">
                  {getWeatherIcon(forecast.weather[0].main)}
                </div>
                <p className="temperature1">{forecast.main.temp}°C</p>
                <p className="weather-description1">
                  {forecast.weather[0].description}
                </p>
                <p className="wind-speed1">{forecast.wind.speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Hourly;
