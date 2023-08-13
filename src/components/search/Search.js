import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL, apiKey } from "../../Api";
import "./search.css";
import loadingGif from "./loader.gif"; // Replace with your loading GIF

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTime, setSearchTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const fetchCurrentTime = (timezone) => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: timezone,
    });
    return currentTime;
  };

  const fetchTimeZone = (latitude, longitude) => {
    const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          return data.zoneName;
        } else {
          throw new Error("Failed to fetch time zone data");
        }
      });
  };

  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    setIsLoading(true); // Set loading to true when fetching data

    // Assuming the selected value is in the format "latitude longitude"
    const [latitude, longitude] = searchData.value.split(" ");
    try {
      const timezone = await fetchTimeZone(latitude, longitude);
      const currentTime = await fetchCurrentTime(timezone);
      setSearchTime(currentTime);
      onSearchChange(searchData);
    } catch (error) {
      console.error("Error fetching time data:", error);
    } finally {
      setIsLoading(false); // Set loading back to false after fetching data
    }
  };

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };

  React.useEffect(() => {
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <p style={{ textAlign: "center", marginTop: "0px" }}>No Internet</p>
      )}
      {searchTime && (
        <p className="time-info">
          Time in {search.label}: {searchTime}
        </p>
      )}
      <AsyncPaginate
        className="input"
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isDisabled={!isOnline}
      />
      {isLoading && (
        <div className="loading-indicator">
          <img src={loadingGif} alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default Search;
