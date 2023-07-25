import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./forecast.css";

function Forecast({ data }) {
  const currentDayIndex = new Date().getDay();
  const allWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Replace the current day with "Today" in the forecatDays array.
  const forecatDays = [
    "Today",
    ...allWeekDays.slice(currentDayIndex + 1),
    ...allWeekDays.slice(0, currentDayIndex),
  ];

  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  const toggleItem = (index) => {
    setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <label className="title">Daily label</label>
      <div className="accordion">
        {data.list.slice(0, 7).map((item, idx) => (
          <div className="accordion-item" key={idx}>
            <div className="daily-item" onClick={() => toggleItem(idx)}>
              <img
                src={`icons/${item.weather[0].icon}.png`}
                className="icon-small"
                alt="weather"
              />
              <label className="day">{forecatDays[idx]}</label>
              <label className="description">
                {item.weather[0].description}
              </label>
              <label className="min-max">
                {Math.round(item.main.temp_min)}°C/{" "}
                {Math.round(item.main.temp_max)}°C
              </label>
              {/* Render the arrow icons based on the expanded state */}
              {expandedItemIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedItemIndex === idx && (
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Forecast;
