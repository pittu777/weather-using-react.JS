// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemButton,
//   AccordionItemHeading,
//   AccordionItemPanel,
// } from "react-accessible-accordion";
import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./forecast.css";
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "ThursDay",
  "Friday",
  "Saturday",
  "Sunday",
];

// const Forecast=({data})=>{
// function Forecast({ data }) {
//   const dayInAweek = new Date().getDay();
//   const today="Today";
//   const forecatDays = WEEK_DAYS.slice(dayInAweek, WEEK_DAYS.length).concat(
//     WEEK_DAYS.slice(0, dayInAweek)
//   );

//   const [expandedItemIndex, setExpandedItemIndex] = useState(null);

//   const toggleItem = (index) => {
//     setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
//   };
function Forecast({ data }) {
  const dayInAweek = new Date().getDay();
  const today = "Today";
  const forecatDays = [
    today,
    ...WEEK_DAYS.slice(dayInAweek + 1),
    ...WEEK_DAYS.slice(0, dayInAweek),
  ];

  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  const toggleItem = (index) => {
    setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    // <>
    //   <label className="title">Daily label</label>
    //   <Accordion allowZeroExpanded>
    //     {data.list.splice(0, 7).map((item, idx) => (
    //       <AccordionItem key={idx}>
    //         <AccordionItemHeading>
    //           <AccordionItemButton>
    //             <div className="daily-item">
    //               <img
    //                 src={`icons/${item.weather[0].icon}.png`}
    //                 className="icon-small"
    //                 alt="weather"
    //               />
    //               <label className="day">{forecatDays[idx]}</label>
    //               <label className="discription">
    //                 {item.weather[0].description}
    //               </label>
    //               <label className="min-max">
    //                 {Math.round(item.main.temp_min)}°C/{" "}
    //                 {Math.round(item.main.temp_max)}°C
    //               </label>
    //             </div>
    //           </AccordionItemButton>
    //         </AccordionItemHeading>
    //         <AccordionItemPanel>
    //           <div className="daily-details-grid">
    //             <div className="daily-details-grid-item">
    //               <label>Pressure:</label>
    //               <label>{item.main.pressure}</label>
    //             </div>
    //             <div className="daily-details-grid-item">
    //               <label>Humidity:</label>
    //               <label>{item.main.humidity}</label>
    //             </div>
    //             <div className="daily-details-grid-item">
    //               <label>Clouds:</label>
    //               <label>{item.clouds.all}%</label>
    //             </div>
    //             <div className="daily-details-grid-item">
    //               <label>Wind speed:</label>
    //               <label>{item.wind.speed} m/s</label>
    //             </div>
    //             <div className="daily-details-grid-item">
    //               <label>Sea level:</label>
    //               <label>{item.main.sea_level}m</label>
    //             </div>
    //             <div className="daily-details-grid-item">
    //               <label>Feels like:</label>
    //               <label>{item.main.feels_like}°C</label>
    //             </div>
    //           </div>
    //         </AccordionItemPanel>
    //       </AccordionItem>
    //     ))}
    //   </Accordion>
    // </>
    // updated
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
