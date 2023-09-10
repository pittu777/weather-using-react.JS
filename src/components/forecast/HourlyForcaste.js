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

function Hourly({ city, apiKey, searchTime }) {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
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
          setCityNotFound(true); //  Set cityNotFound state to true if city is not found
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
  const handleBoxClick = (index) => {
    // Define handleBoxClick function to toggle active box
    setActiveBox(index === activeBox ? null : index);
  };
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
      <p className="time-info animate__animated animate__rubberBand">
        Time in {city}: {searchTime}
      </p>
      <h1 className="hourly-title1 time-info">
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
          <div className="body">
            <div className="hourly-items1">
              {hourlyForecast.map((forecast, index) => (
                <div
                  className="hourly-item1"
                  key={index}
                  onClick={() => handleBoxClick(index)}
                >
                  <div className="box-header">
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
                  </div>
                  <div
                    className={`box-details ${
                      activeBox === index ? "active" : ""
                    }`}
                  >
                    <p className="temperature1">temperature:{forecast.main.temp}°C</p>
                    <p className="weather-description1">description:
                      {forecast.weather[0].description}
                    </p>
                    <p className="wind-speed1">Wind speed:{forecast.wind.speed} m/s</p>
                    <p className="humidity1">humidity:{forecast.main.humidity}%</p>
                    <p className="pressure1">pressure:{forecast.main.pressure}hPa</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Hourly;
