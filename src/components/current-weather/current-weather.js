// import React from "react";
// import { Link } from "react-router-dom";
// // import loaderGif from "https://www.ilovepdf.com/img/svg_icons/preload.svg";
// import "./current-weather.css";
// import { Button } from "@material-tailwind/react";

// function CurrentWeather({ data, isLoading }) {
//   const getTimeZoneOffset = (timezoneInSeconds) => {
//     const offsetHours = Math.floor(timezoneInSeconds / 3600);
//     const offsetMinutes = Math.abs(Math.floor((timezoneInSeconds % 3600) / 60));

//     const sign = offsetHours >= 0 ? "+" : "-";
//     return `${sign}${Math.abs(offsetHours)}:${String(offsetMinutes).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   function getLocalTime(timezone, dt) {
//     let utc_time = new Date(dt * 1000);
//     let local_time = new Date(utc_time.getTime() + timezone * 1000);
//     let local_time_format = local_time.toLocaleTimeString("en-US", {
//       timeZone: "UTC",
//       hour12: true,
//       hour: "numeric",
//       minute: "numeric",
//     });
//     return local_time_format;
//   }

//   console.log(data);

//   return (
//     <>
//       <div className="weather">
//         {isLoading ? (
//           <div>
//             <div>
//               <p></p>
//             </div>
//           </div>
//         ) : (
//           <div className="top">
//             <div>
//               <p className="city">{data.city}</p>
//               <p className="weather-disc">{data.weather[0].description}</p>
//             </div>
//             <img
//               src={`icons/${data.weather[0].icon}.png`}
//               alt="weather"
//               className="weather-icon"
//             />
//           </div>
//         )}
//         <div className="bottom">
//           {isLoading ? (
//             <div className="loading-indicator2">
//               <img src="https://www.ilovepdf.com/img/svg_icons/preload.svg" alt="" />
//               <p className="fetching-data">Fetching data...</p>
//             </div>
//           ) : (
//             <>
//               <p className="temperature">{Math.round(data.main.temp)}°C</p>
//               <div className="details">
//                 <div className="parameter-row">
//                   <span className="parameter-label">Details</span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">Feels like</span>
//                   <span className="parameter-value">
//                     {Math.round(data.main.feels_like)}°C
//                   </span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">Wind</span>
//                   <span className="parameter-value">{data.wind.speed} m/s</span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">timezone</span>
//                   <span className="parameter-value">
//                     {getTimeZoneOffset(data.timezone)} UTC
//                   </span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">sunrise</span>
//                   <span className="parameter-value">
//                     {getLocalTime(data.timezone, data.sys.sunrise)}
//                   </span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">sunset</span>
//                   <span className="parameter-value">
//                     {getLocalTime(data.timezone, data.sys.sunset)}
//                   </span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">Humidity</span>
//                   <span className="parameter-value">{data.main.humidity}%</span>
//                 </div>
//                 <div className="parameter-row">
//                   <span className="parameter-label">Pressure</span>
//                   <span className="parameter-value">
//                     {data.main.pressure} hPa
//                   </span>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//         {/* Remove the WeatherMap component from here */}
//         <div className="show-map-button">
//           <Link to="/map">
//             <Button className="button">Show Map</Button>
//           </Link>
//         </div>
//       </div>

//     </>
//   );
// }

// export default CurrentWeather;

//

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import "./current-weather.css"; // Ensure your CSS file is imported

function CurrentWeather({ data, isLoading }) {
  const getTimeZoneOffset = (timezoneInSeconds) => {
    const offsetHours = Math.floor(timezoneInSeconds / 3600);
    const offsetMinutes = Math.abs(Math.floor((timezoneInSeconds % 3600) / 60));

    const sign = offsetHours >= 0 ? "+" : "-";
    return `${sign}${Math.abs(offsetHours)}:${String(offsetMinutes).padStart(
      2,
      "0"
    )}`;
  };

  function getLocalTime(timezone, dt) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    let local_time_format = local_time.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return local_time_format;
  }

  console.log(data);

  return (
    <>
      <div className="weather w-[330px] shadow-[10px_-2px_20px_2px_rgb(0_0_0_0/_30%)] text-white bg-[#333] mt-5 mb-0 mx-auto pt-0 pb-5 px-5 rounded-md">
        {isLoading ? (
          <div>
            <div>
              <p></p>
            </div>
          </div>
        ) : (
          <div className="top">
            <div>
              <p className="city font-semibold text-lg leading-none tracking-[1px] m-0">
                {data.city}
              </p>
              <p className="weather-disc font-normal text-sm leading-none m-0">
                {data.weather[0].description}
              </p>
            </div>
            <img
              src={`icons/${data.weather[0].icon}.png`}
              alt="weather"
              className="weather-icon w-[100px]"
            />
          </div>
        )}
        <div className="bottom">
          {isLoading ? (
            <div className="loading-indicator2 flex flex-col items-center justify-center ml-[25px] mt-20">
              <img
                className="w-10 h-10"
                src="https://www.ilovepdf.com/img/svg_icons/preload.svg"
                alt=""
              />
              <p className="fetching-data m-[66px] font-normal text-sm mt-2.5">
                Fetching data...
              </p>
            </div>
          ) : (
            <>
              <p className="temperature font-semibold text-[80px] w-auto tracking-[-5px] mx-0 my-2.5">
                {Math.round(data.main.temp)}°C
              </p>
              <div className="details w-full pl-5">
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    Details
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    Feels like
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {Math.round(data.main.feels_like)}°C
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    Wind
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {data.wind.speed} m/s
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    timezone
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {getTimeZoneOffset(data.timezone)} UTC
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    sunrise
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {getLocalTime(data.timezone, data.sys.sunrise)}
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    sunset
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {getLocalTime(data.timezone, data.sys.sunset)}
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    Humidity
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {data.main.humidity}%
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label text-left font-normal text-xs">
                    Pressure
                  </span>
                  <span className="parameter-value font-semibold text-xs">
                    {data.main.pressure} hPa
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="show-map-button">
          <Link to="/map">
            <Button className="button">show map</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
