import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import { FiArrowRight } from "react-icons/fi";
import "./App.css";
import "animate.css";
import "leaflet/dist/leaflet.css";
// import PopupMessage from "./components/PopUp/PopUp";
import Hourly from "./components/forecast/HourlyForcaste";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";
import Map from "./components/WeatherMap/Map/Map";
import CurrentWeather from "./components/current-weather/current-weather";
import MapForcaste from "./components/forecast/MapForcast";
import Developer from "./components/Developers/Developers";
import ContactForm from "./components/footer/ContactForm";

function App() {
  // Initialize state variables
  const [currentWeatherData, setCurrentWeatherData] = React.useState(null);
  const [forecastData, setForecastData] = React.useState(null);
  const [searchTime, setSearchTime] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Function to handle search change
  const handleOnSearchChange = (searchdata) => {
    setIsLoading(true);
    setSelectedCity(searchdata);
    const [lat, lon] = searchdata.value.split(" ");

    // Fetch current weather and forecast data
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Use Promise.all to fetch both data concurrently
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        // Update state with fetched data
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {/* Router setup */}
      <Router>
        <div>
          <h1 className="global animate__animated animate__rubberBand text-3xl font-bold text-center">
            WEATHER APP
            <div className="logo">
              <img className="logo_img" src="./logo.png" alt="" />
            </div>
          </h1>
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

          {/* Routes for different components */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {currentWeatherData ? (
                    <CurrentWeather
                      data={currentWeatherData}
                      isLoading={isLoading}
                    />
                  ) : null}
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
                  {forecastData && <Forecast data={forecastData} isLoading={isLoading} />}
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
                  searchTime={searchTime}
                />
              }
            />
          </Routes>
        </div>

        {/* Developer route */}
        <Routes>
          <Route path="/our team" element={<Developer />} />
        </Routes>
        <Routes>
          <Route path="/Map" element={currentWeatherData && <Map location={currentWeatherData}
                      city={currentWeatherData.city}
                      lat={currentWeatherData.lat}
                      lon={currentWeatherData.lon}
                      temp={currentWeatherData}
                      searchTime={searchTime}/>} />
        </Routes>
        
        <Routes>
          <Route path="/contact us" element={<ContactForm />}></Route>
        </Routes>
        <Routes>
          <Route path="/Feedback" element={<ContactForm />}></Route>
        </Routes>
        <Link to="/faqs"></Link>
      </Router>
    </>
  );
}

export default App;
