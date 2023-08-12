import React, { useState } from "react";
import Search from "../../search/Search";
import Map from "./Map";

const ParentComponent = () => {
    const [searchTime, setSearchTime] = useState(null);
  
    // Define the function to update searchTime
    const handleSearchTimeChange = (time) => {
      setSearchTime(time);
    };
  
    return (
      <div>
        <Search onSearchChange={handleSearchTimeChange} />
        <Map searchTime={searchTime} />
      </div>
    );
  };
  

  export default ParentComponent;