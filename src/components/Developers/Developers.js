// src/components/PeopleList.js

import React from 'react';
import peopleData from "./../../Data/Data.js";
import "./Developer.css";
import BackButton from '../WeatherMap/BackButton/BackButton.js';

function Developer() {
  return (
    <>
    <div className='container-developer'>
      <h1 className='heading'>Developers</h1>
      <ul className='ul'>
        {peopleData.map((person, index) => (
          <li className='li' key={index}>
            <h2 className='h2'>{person.name}</h2>
            <img className='img' src={person.image} alt={person.name} />
            <p className='paragraph'>Year:{person.Year}</p>
            <p className='paragraph'>Branch:{person.Branch}</p>
            <p className='paragraph'>Profession: {person.profession}</p>
          </li>
        ))}
      </ul>
    </div>
    <div>
        <BackButton/>

    </div>
   </>
  );
}

export default Developer;
