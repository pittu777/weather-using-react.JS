import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL, apiKey } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTime, setSearchTime] = useState("");
  const [weatherDataLoaded, setWeatherDataLoaded] = useState(false); // New state

  console.log(searchTime);

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

    // Assuming the selected value is in the format "latitude longitude"
    const [latitude, longitude] = searchData.value.split(" ");
    try {
      onSearchChange(searchData);
      if (!weatherDataLoaded) {
        // Fetch time data only if weather data has not been loaded
        const timezone = await fetchTimeZone(latitude, longitude);
        const currentTime = await fetchCurrentTime(timezone);
        setSearchTime(currentTime);
        setWeatherDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };

  // Add event listener to check online status changes.
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
        <p style={{ textAlign: "center", marginTop: "8px" }}>
          Time in {search.label}: {searchTime}
        </p>
      )}
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isDisabled={!isOnline}
      />
    </>
  );
};

export default Search;
