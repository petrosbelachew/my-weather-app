// Filename: ForecastDisplay.jsx

import React, { useState, useEffect, useCallback } from "react";
// Import the API fetching logic from the separate JS file
import { fetchWeatherForecast } from "../api/weather/get-forecast.js";
// NOTE: You would typically import './forecast-styles.css' here

const DEFAULT_CITY = "London";

// --- Sub-Component: ForecastCard ---
// Simple component to display one day's weather data
const ForecastCard = ({ data }) => {
  // OpenWeatherMap icon URL structure
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
  // 1. State for controlling user input and displayed city
  const [city, setCity] = useState(DEFAULT_CITY);
  const [inputCity, setInputCity] = useState(DEFAULT_CITY);

  // 2. State for holding the forecast data
  const [forecast, setForecast] = useState([]);

  // 3. States for user feedback (loading and errors)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to call the API logic and update state
  const loadForecast = useCallback(async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setError(null); // Clear previous errors
    setForecast([]); // Clear previous data

    try {
      // CALL THE EXTERNAL JAVASCRIPT LOGIC
      const result = await fetchWeatherForecast(targetCity);

      setForecast(result.forecast);
      setCity(result.city); // Use the city name returned by the API
    } catch (err) {
      setError(err.message); // Set the error message caught from the JS file
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }, []);

  // Effect runs ONCE on mount to load the default city
  useEffect(() => {
    loadForecast(DEFAULT_CITY);
  }, [loadForecast]);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      loadForecast(inputCity.trim());
    }
  };

  return (
    <div className="weather-forecast-app">
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

      <h2 className="city-header">Forecast for {city}</h2>

      {/* --- CONDITIONAL RENDERING --- */}

      {/* 1. Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Fetching Forecast...</span>
        </div>
      )}

      {/* 2. Error Message */}
      {error && (
        <div className="error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* 3. Successful Data Display */}
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
