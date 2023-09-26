import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import NotFound from "./pageNot";
import loadingGif from "./images/loader.gif";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
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
  const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  const loadingBarRef = React.useRef(null);

  console.log(hourlyForecast);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching data

    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setCityNotFound(true);
        } else {
          setHourlyForecast(data.list);
        }

        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }

        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }

        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [city, apiKey]);

  const updateScrollProgress = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const progress = (scrollY / maxScroll) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", updateScrollProgress); // Remove scroll event listener
    };
  }, []);

  const handleBoxClick = (index) => {
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
      {isLoading ? (
        // Show a loading message instead of skeleton loading
        <div className="loading-indicator1">
          <div>
            <img src={loadingGif} alt="" />
            <p>Fetching data...</p>
          </div>
        </div>
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
              {hourlyForecast && hourlyForecast.length > 0 ? (
                hourlyForecast.map((forecast, index) => (
                  <div
                    className="hourly-item1"
                    key={index}
                    onClick={() => handleBoxClick(index)}
                  >
                    <div className="box-header">
                      <div className="weather-icon1">
                        {getWeatherIcon(forecast.weather[0].main)}
                      </div>
                      <p className="time1">
                        {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <div>{forecast.weather[0].description}</div>
                      <div>
                        {Math.round(forecast.main.temp_min)}°C/{" "}
                        {Math.round(forecast.main.temp_max)}°C
                      </div>
                      <div className="expand-icon">
                        {activeBox === index ? (
                          <FiChevronUp size={24} />
                        ) : (
                          <FiChevronDown size={24} />
                        )}
                      </div>
                    </div>
                    <div
                      className={`box-details ${
                        activeBox === index ? "active" : ""
                      }`}
                    >
                      <p className="temperature1">
                        temparature:{Math.round(forecast.main.temp)}°C
                      </p>
                      <p className="weather-description1">
                        description: {forecast.weather[0].description}
                      </p>
                      <p className="wind-speed1">
                        Wind speed:{forecast.wind.speed} m/s
                      </p>
                      <p className="humidity1">
                        humidity:{forecast.main.humidity}%
                      </p>
                      <p className="pressure1">
                        pressure:{forecast.main.pressure}hPa
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </>
      )}
      {scrollProgress > 0 && (
        <div className="scroll-loader">
          <div
            className="scroll-loader-progress"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Hourly;
