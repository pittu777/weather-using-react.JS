import React from "react"

import "./App.css"
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";
import "./index.css"
import {WEATHER_API_URL, WEATHER_API_KEY} from "./Api"
import CurrentWeather from "./components/current-weather/current-weather";
function App(){

  const [currentweather, setCurrentweather]=React.useState(null);
  const [forcast, setForcast]=React.useState(null);

  const handleOnSearchChange=(searchdata)=>{
    const [lat, lon]=searchdata.value.split(" ");

    const currentweatherfetch=fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forcastfetch=fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    
    Promise.all([currentweatherfetch, forcastfetch])
      .then(async(response)=>{
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentweather({city: searchdata.label, ...weatherResponse});
        setForcast({city: searchdata.label, ...forcastResponse});
      })
      .catch((err)=>{
        console.log(err);
      })

    
  }
  console.log(currentweather);
  console.log(forcast)
  return(
    <div >
      <h1>madeByPittu</h1>
      <Search onSearchChange={handleOnSearchChange}/>

      { currentweather && <CurrentWeather data={currentweather}/>}
      
      {forcast && <Forecast  data={forcast}/>}
    </div>
  )
}
export default App;