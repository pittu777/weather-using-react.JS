import React from "react";
import "./Map/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconUrl from "./marker.png"; // Replace this path with the correct path to your marker icon

const WeatherMap = ({ city, lat, lon }) => {
  const markerIcon = new L.Icon({
    iconUrl: markerIconUrl, // Use the imported icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="map-container2">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]} icon={markerIcon}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
