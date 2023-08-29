import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import "./forecast.css";
import "animate.css";
import "./../search/search.css";
import BackButton from "../WeatherMap/BackButton/BackButton";

function Hourly({ city, apiKey }) {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);
  const loadingBarRef = React.useRef(null);

  console.log(hourlyForecast);

  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setCityNotFound(true); // Set cityNotFound state to true if city is not found
        } else {
          setHourlyForecast(data.list);
        }

        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
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
    <div>
      <h1 className="hourly-title1">
        {cityNotFound
          ? "City not found"
          : `Hourly Weather Forecast for ${city}`}
      </h1>
      {cityNotFound ? (
        <p>Please search for a city to see hourly forecast.</p>
      ) : (
        <>
          <div>
            <LoadingBar ref={loadingBarRef} color="black" height={4} />
          </div>
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
                <p className="wind-speed1">{forecast.main.humidity}%</p>
                <p className="wind-speed1">{forecast.main.pressure}h Pa</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Hourly;
