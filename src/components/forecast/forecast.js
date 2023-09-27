// import React, { useState } from "react";
// import { FiChevronUp, FiChevronDown } from "react-icons/fi";
// import "./forecast.css";
// import loaderGif from "./images/loader.gif";

// function Forecast({ data, isLoading }) {
//   const currentDayIndex = new Date().getDay();
//   const allWeekDays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   // Replace the current day with "Today" in the forecatDays array.
//   const forecatDays = [
//     "Today",
//     ...allWeekDays.slice(currentDayIndex + 1),
//     ...allWeekDays.slice(0, currentDayIndex),
//   ];

//   const [expandedItemIndex, setExpandedItemIndex] = useState(null);

//   const toggleItem = (index) => {
//     setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <>
//       <label className="title">Daily label</label>
//       {console.log("isLoading:", isLoading)}

//       <div className="accordion">
//         {data.list.slice(0, 7).map((item, idx) => (
//           <div className="accordion-item" key={idx}>
//             {isLoading?(
//            <div className="loading-indicator1">
//            <img src={loaderGif} alt=".." />
//            <p className="fetching-data">Fetching data...</p>
//          </div>
//       ):(
//             <div className="daily-item" onClick={() => toggleItem(idx)}>
//               <img
//                 src={`icons/${item.weather[0].icon}.png`}
//                 className="icon-small"
//                 alt="weather"
//               />
//               <label className="day">{forecatDays[idx]}</label>
//               <label className="description">
//                 {item.weather[0].description}
//               </label>
//               <label className="min-max">
//                 {Math.round(item.main.temp_min)}°C/{" "}
//                 {Math.round(item.main.temp_max)}°C
//               </label>
//               {/* Render the arrow icons based on the expanded state */}
//               {expandedItemIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
//             </div>
//       )}
//             {expandedItemIndex === idx && (
//               <div className="daily-details-grid">
//                 <div className="daily-details-grid-item">
//                   <label>Pressure:</label>
//                   <label>{item.main.pressure} hPa</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Humidity:</label>
//                   <label>{item.main.humidity}%</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Clouds:</label>
//                   <label>{item.clouds.all}%</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Wind speed:</label>
//                   <label>{item.wind.speed} m/s</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Sea level:</label>
//                   <label>{item.main.sea_level}m</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Feels like:</label>
//                   <label>{item.main.feels_like}°C</label>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//     </>
//   );
// }

// export default Forecast;

// Import necessary libraries and assets
import React, { useState, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi"; // Importing icons
import "./forecast.css"; // Importing CSS styles
import loaderGif from "./images/loader.gif"; // Importing loader image

// Define a React functional component named Forecast
function Forecast({ data, isLoading }) {
  // Calculate the current day index and create an array of week days
  const currentDayIndex = new Date().getDay();
  const allWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Replace the current day with "Today" in the forecastDays array
  const forecastDays = [
    "Today",
    ...allWeekDays.slice(currentDayIndex + 1),
    ...allWeekDays.slice(0, currentDayIndex),
  ];

  // Create an array of loading states for each label
  const [loadingStates, setLoadingStates] = useState(Array(7).fill(false));

  // useEffect to set loading states when isLoading changes
  useEffect(() => {
    if (isLoading) {
      // Set all loading states to true if data is loading
      setLoadingStates(Array(7).fill(true));
    } else {
      // Reset loading states when data is loaded
      setLoadingStates(Array(7).fill(false));
    }
  }, [isLoading]);

  // Function to toggle the expanded state of an item
  const toggleItem = (index) => {
    setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // State to track the index of the expanded item
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  // JSX code for rendering the component
  return (
    <>
      <label className="title">Daily label</label>

      <div className="accordion">
        {data.list.slice(0, 7).map((item, idx) => (
          <div className="accordion-item" key={idx}>
            <div className="daily-item" onClick={() => toggleItem(idx)}>
              {/* Display the loader if loading state is true */}
              {loadingStates[idx] && (
                <div className="loading-indicator-label">
                  <img src={loaderGif} alt=".." />
                  <p className="fetching-data">Fetching data...</p>
                </div>
              )}
              {/* Display weather data when not loading */}
              {!loadingStates[idx] && (
                <>
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C/{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                  {/* Render the arrow icons based on the expanded state */}
                  {expandedItemIndex === idx ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </>
              )}
            </div>
            {expandedItemIndex === idx && (
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}%</label>
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

// Export the Forecast component as the default export of the module
export default Forecast;
