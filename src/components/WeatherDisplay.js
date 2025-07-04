// src/components/WeatherDisplay.js
import React from 'react';
import '../app.css';
import { getEmojiForWeather, convertUnixToTime } from '../utils'; // Fonksiyonları utils'den import et

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null; // weatherData yoksa bir şey gösterme
  }

  return (
    <> {/* Birden fazla elementi sarmalamak için React Fragment kullanıyoruz */}
      <div className="weather-info">
        <h2>{weatherData.name}</h2>
        <p> Hissedilen: {weatherData.main.feels_like}°C</p>
        <p>Hava: {weatherData.weather[0].description} {getEmojiForWeather(weatherData.weather[0].description)}</p>
        <p>Sıcaklık: <span className="current-temp">{weatherData.main.temp}°C</span></p>
        <p>Nem: {weatherData.main.humidity}%</p>
        <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
        <p>Gün Doğumu: {convertUnixToTime(weatherData.sys.sunrise)}</p>
        <p>Gün Batımı: {convertUnixToTime(weatherData.sys.sunset)}</p>
      </div>

      {/* Emoji tavsiyesi */}
      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
        {(() => {
          const desc = weatherData.weather[0].description.toLowerCase();
          if (desc.includes('yağmur')) return 'Bugün yağış bekleniyor.';
          if (desc.includes('güneş') || desc.includes('açık')) return 'Bugün hava açık ve güneşli';
          if (desc.includes('kar')) return 'Düşük sıcaklıklar bekleniyor.';
          if (desc.includes('bulut')) return 'Bugün hava parçalı bulutlu.☁️';
          return 'Havayı kontrol ettin, harikasın! 👍';
        })()}
      </div>
    </>
  );
};

export default WeatherDisplay;