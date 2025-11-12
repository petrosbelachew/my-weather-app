// Filename: ForecastDisplay.jsx

import React, { useState, useEffect, useCallback } from "react";
import { fetchWeatherForecast } from "../api/weather/get-forecast.js";
import "./forecast-styles.css"; // Don't forget to import your CSS!

const DEFAULT_CITY = "London";

// --- Sub-Component: ForecastCard ---
// This component displays a single day's weather data
const ForecastCard = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="forecast-card">
      <p className="card-date">{data.date}</p>
      <img src={iconUrl} alt={data.description} className="card-icon" />
      <p className="card-temp">{data.temp}°C</p>
      <p className="card-description">{data.description}</p>
    </div>
  );
};

// --- Main Component: ForecastDisplay ---
const ForecastDisplay = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [inputCity, setInputCity] = useState(DEFAULT_CITY);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadForecast = useCallback(async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setError(null);
    setForecast([]);

    try {
      const result = await fetchWeatherForecast(targetCity);

      setForecast(result.forecast);
      setCity(result.city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForecast(DEFAULT_CITY);
  }, [loadForecast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      loadForecast(inputCity.trim());
    }
  };

  return (
    <div className="weather-forecast-app-container">
      <h1 className="app-title">5-Day Weather Forecast</h1>

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
        Forecast for <span className="highlight-city">{city}</span>
      </h2>

      {/* --- CONDITIONAL RENDERING --- */}

      {/* Loading State */}
      {loading && (
        <div className="status-message loading-state">
          <div className="spinner"></div>
          <span>Fetching Forecast...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="status-message error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Successful Data Display */}
      {!loading && !error && forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <ForecastCard key={index} data={day} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastDisplay;
