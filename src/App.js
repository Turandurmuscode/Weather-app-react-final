import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import MapComponent from './components/MapComponent'; 
import ChartComponent from './components/ChartComponent'; 
import './app.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            if (weatherData.cod === 200) {
              setWeather(weatherData);
              setCity(weatherData.name);

              const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`;
              const forecastResponse = await fetch(forecastUrl);
              const forecastData = await forecastResponse.json();

              if (forecastData.cod === '200') {
                setForecast(forecastData);
              } else {
                setForecast(null);
              }
            } else {
              setError('Konum için hava durumu bulunamadı.');
              setWeather(null);
              setForecast(null);
            }
          } catch (error) {
            console.error('Konumdan hava durumu alınırken hata:', error);
            setError('Konumdan hava durumu alınamadı. Lütfen tekrar deneyin.');
            setWeather(null);
            setForecast(null);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.log('Konum alınamadı:', error.message);
          setError('Konum izni verilmedi veya alınamadı. Varsayılan şehir için arama yapın.');
          setLoading(false);
        }
      );
    } else {
      console.log('Tarayıcı konum API desteklemiyor.');
      setError('Tarayıcınız konum API\'sini desteklemiyor.');
    }
  }, [apiKey]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError('Lütfen şehir ismi girin.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric&lang=tr`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        setWeather(null);
        setForecast(null);
        setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
        return;
      }
      setWeather(weatherData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedCity}&appid=${apiKey}&units=metric&lang=tr`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (forecastData.cod === '200') {
        setForecast(forecastData);
      } else {
        setForecast(null);
        setError('Tahmin verileri alınamadı.');
      }
    } catch (error) {
      console.error(error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overall-layout-container">
      {}
      {weather && <MapComponent weatherData={weather} />}

      {}
      <div className="app-container">
        <h1>Weather App</h1>
        {loading && <p className='loading'>Yükleniyor...</p>}
        {error && <p className='error-message'>{error}</p>}

        <SearchBar
          city={city}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
        />
        {weather && <WeatherDisplay weatherData={weather} />}

        {forecast && (
          <ForecastDisplay
            forecast={forecast}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
          />
        )}
      </div>

      {}
      {forecast && <ChartComponent forecast={forecast} />}
    </div>
  );
}

export default App;