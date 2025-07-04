// src/components/ForecastDisplay.js
import React from 'react';
import '../app.css'; 
import { convertDtTxtToDate, groupForecastByDay, getEmojiForWeather } from '../utils'; 

const ForecastDisplay = ({ forecast, activeDay, setActiveDay }) => {
  if (!forecast) {
    return null; 
  }

  return (
    <div className="forecast-info">
      <h3>5 Günlük Tahmin</h3>
      {Object.entries(groupForecastByDay(forecast.list)).map(([day, items]) => (
        <div className="accordion-item" key={day}>
          <button
            className="accordion-header"
            onClick={() => setActiveDay(activeDay === day ? null : day)}
          >
            {new Date(day).toLocaleDateString('tr-TR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </button>
          {activeDay === day && (
            <div className="accordion-content">
              {items.map((item, index) => (
                <div className="forecast-hour" key={index}>
                  <p>{convertDtTxtToDate(item.dt_txt)}</p>
                  <p>{item.main.temp}°C</p>
                  <p>{item.weather[0].description}{getEmojiForWeather(item.weather[0].description)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;