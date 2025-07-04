// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS'ini burada import et

// Leaflet kütüphanesini import et ve ikonları yerel yollardan yükle
import L from 'leaflet';
// Eğer bu import'lar çalışmazsa, CDN linklerini kullanabiliriz:
// https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png
// https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png
// https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet varsayılan ikon ayarları (marker'ların görünmesi için kritik!)
// Bu satır, bazı React/Webpack kurulumlarında ikonların görünmesini sağlayan yaygın bir çözümdür.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: shadow,
});

const MapComponent = ({ weatherData }) => {
  if (!weatherData || !weatherData.coord) { // weatherData veya coord yoksa harita gösterme
    return null;
  }

  const position = [weatherData.coord.lat, weatherData.coord.lon];

  return (
    <div className="map-container">
      <h3>Konum</h3>
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true} // Kaydırma tekerleğiyle zoom'u kapat
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