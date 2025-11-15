import React, { useState, useCallback, useEffect } from "react";
import { fetchCurrentWeather } from "../api/get-current.js";
import { cityName } from "./utils/configs/api-config.js";

// --- Sub-Component: CurrentWeatherCard (Presentational JSX) ---
// Displays current weather using the forecast's class names
const CurrentWeatherCard = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    // Uses .forecast-card style for the wrapper
    <div className="forecast-card current-weather-card">
      {/* Display City Name using .card-date style */}
      <p className="card-date">{data.city}</p>

      <img src={iconUrl} alt={data.condition} className="card-icon" />

      {/* Display Temperature using .card-temp style */}
      <p className="card-temp">{data.temperature}°C</p>

      {/* Weather Condition using .card-description style */}
      <p className="card-description">{data.condition}</p>

      {/* Additional details for current weather */}
      <div className="current-details">
        <p>Humidity: {data.humidity}%</p>
        <p>Wind: {data.windSpeed} m/s</p>
      </div>
    </div>
  );
};

// --- Main Component: CurrentWeatherApp (Container and Logic) ---
const CurrentWeatherApp = () => {
  // State variables mirror the forecast template
  const [city, setCity] = useState(cityName);
  const [inputCity, setInputCity] = useState(cityName);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setError(null);
    setCurrentWeather(null);

    try {
      // fetchWeatherForecast returns { city, current: {...data} }
      const result = await fetchWeatherForecast(targetCity);

      setCurrentWeather(result.current);
      setCity(result.city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(cityName);
  }, [loadWeather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      loadWeather(inputCity.trim());
    }
  };

  return (
    <div className="weather-forecast-app-container">
      <h1 className="app-title">Current Weather Search</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name (e.g., Tokyo)"
          className="city-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? "Searching..." : "Get Forecast"}
        </button>
      </form>

      <h2 className="city-header">
        Current Weather for <span className="highlight-city">{city}</span>
      </h2>

      {/* --- CONDITIONAL RENDERING --- */}

      {/* Loading State */}
      {loading && (
        <div className="status-message loading-state">
          <div className="spinner"></div>
          <span>Fetching Current Weather...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="status-message error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Successful Data Display - Renders the single card */}
      {!loading && !error && currentWeather && (
        <div className="current-weather-wrapper">
          <CurrentWeatherCard data={currentWeather} />
        </div>
      )}
      {!loading && !error && !currentWeather && !error && (
        <div className="status-message">
          Enter a city to see the current weather.
        </div>
      )}
    </div>
  );
};

export default CurrentWeatherApp;
