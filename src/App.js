import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import Map from "./components/WeatherMap/Map/Map";
import WeatherMap2 from "./components/WeatherMap/Map2/weatherMap";
import CurrentWeather from "./components/current-weather/current-weather";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = React.useState(null);
  const [forecastData, setForecastData] = React.useState(null);

  const handleOnSearchChange = (searchdata) => {
    const [lat, lon] = searchdata.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        setCurrentWeatherData({
          city: searchdata.label,
          lat,
          lon,
          ...currentWeatherResponse,
        });
        setForecastData({ city: searchdata.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Router>
        <div>
          <h1>WEATHER APP</h1>

          {/* Conditionally render the Search component based on the route */}
          <Routes>
            <Route
              path="/"
              element={<Search onSearchChange={handleOnSearchChange} />}
            />
            <Route path="/map" element={null} />
            <Route path="/weatherMap" element={null} />
          </Routes>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {currentWeatherData && (
                    <CurrentWeather data={currentWeatherData} />
                  )}
                  {forecastData && <Forecast data={forecastData} />}
                </>
              }
            />
            <Route
              path="/map"
              element={
                <>
                  {currentWeatherData && <Map location={currentWeatherData} />}
                </>
              }
            />
             <Route
              path="/weatherMap"
              element={
                <WeatherMap2/>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
