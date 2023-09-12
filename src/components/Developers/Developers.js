import React from 'react';
import peopleData from './../../Data/Data.js';
import './Developer.css'; // Import the CSS file
import BackButton from '../WeatherMap/BackButton/BackButton.js';

function Developer() {
  return (
    <div className="people-list-container"> {/* Added class name to the div */}
      <h1 className="people-list-title">Developers</h1> {/* Added class name to the heading */}
      <ul className="people-list">
        {peopleData.map((person, index) => (
          <li className="person" key={index}> {/* Added class name to the list item */}
            <h2 className="person-name">{person.name}</h2> {/* Added class name to the name */}
            <div className="image-container"> {/* Added class name to the image container */}
              <img className="person-image" src={person.image} alt={person.name} /> {/* Added class name to the image */}
            </div>
            <p className="person-profession">{person.Year}</p>
            <p className="person-profession">{person.Branch}</p>
            <p className="person-profession">{person.profession}</p> {/* Added class name to the profession */}
          </li>
        ))}
      </ul>
      <BackButton/>
    </div>
  );
}

export default Developer;
