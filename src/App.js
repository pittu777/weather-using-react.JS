import React from "react";
import PopupMessage from "./components/PopUp/PopUp";
import "animate.css";
import Hourly from "./components/forecast/HourlyForcaste";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FiArrowRight } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import Map from "./components/WeatherMap/Map/Map";
import CurrentWeather from "./components/current-weather/current-weather";
import MapForcaste from "./components/forecast/MapForcast";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = React.useState(null);
  const [forecastData, setForecastData] = React.useState(null);
  const [searchTime, setSearchTime] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState(null);

  const handleOnSearchChange = (searchdata) => {
    setSelectedCity(searchdata);
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

        // Set the searchTime state with the current time
        const currentTime = new Date().toLocaleTimeString("en-US");
        setSearchTime(currentTime);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Router>
        <div>
          <h1 className="animate__animated animate__swing custom-h1">
            WEATHER APP
          </h1>
          <PopupMessage/>

          {/* Conditionally render the Search component based on the route */}
          <Routes>
            <Route
              path="/"
              element={
                <Search
                  onSearchChange={handleOnSearchChange}
                  searchTime={searchTime}
                />
              }
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
                  <nav>
                    {currentWeatherData ? (
                      <div>
                        <label className="title">Hourly</label>
                        <br />
                        <Link to="/hourly" className="hourly-button">
                          Hourly Forecast <FiArrowRight />
                        </Link>
                      </div>
                    ) : null}
                  </nav>
                  {forecastData && <Forecast data={forecastData} />}
                  {selectedCity && <MapForcaste selectedCity={selectedCity} />}
                </>
              }
            />
            <Route
              path="/map"
              element={
                <>
                  {currentWeatherData && (
                    <Map
                      location={currentWeatherData}
                      city={currentWeatherData.city}
                      lat={currentWeatherData.lat}
                      lon={currentWeatherData.lon}
                      temp={currentWeatherData}
                      searchTime={searchTime}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/hourly"
              element={
                <Hourly
                  city={currentWeatherData?.city}
                  apiKey={WEATHER_API_KEY}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
