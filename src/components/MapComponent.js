// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

// Bu satır, bazı React/Webpack kurulumlarında ikonların görünmesini sağlayan yaygın bir çözümdür.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: shadow,
});

const MapComponent = ({ weatherData }) => {
  if (!weatherData || !weatherData.coord) { 
    return null;
  }

  const position = [weatherData.coord.lat, weatherData.coord.lon];

  return (
    <div className="map-container">
      <h3>Konum</h3>
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true} 
        style={{ height: '300px', width: '300px', borderRadius: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>{weatherData.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;