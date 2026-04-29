import React, { useState, useEffect, useCallback } from "react";
import { fetchWeatherForecast } from "../api/get-forecast.js";
import "./forecast-styles.css";
import { cityName } from "./utils/configs/api-config.js";
import WeatherCard from "../components/weather-card.jsx";

// --- Sub-Component: ForecastCard ---
const ForecastCard = ({ data }) => {
  // Safety check: If data is missing entirely, render nothing
  if (!data) return null;

  // 1. Normalize with Safety Checks
  // We use ?. to check for nesting (raw API) and ?? to fallback to top-level (flattened API)
  const normalizedData = {
    date: data.dt_txt || data.date || "Upcoming",
    temperature: data.main?.temp ?? data.temperature ?? data.temp,
    condition:
      data.weather?.[0]?.description ?? data.condition ?? data.description,
    humidity: data.main?.humidity ?? data.humidity,
    windSpeed: data.wind?.speed ?? data.windSpeed,
    icon: data.weather?.[0]?.icon ?? data.icon,
  };

  return (
    <div className="forecast-item-wrapper">
      <WeatherCard data={normalizedData} />
    </div>
  );
};

// --- Main Component: ForecastDisplay ---
const ForecastDisplay = () => {
  const [city, setCity] = useState(cityName);
  const [inputCity, setInputCity] = useState(cityName);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadForecast = useCallback(async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setError(null);
    // Don't clear forecast here to avoid "flicker" if you prefer

    try {
      const result = await fetchWeatherForecast(targetCity);

      // Verify that result.forecast is actually an array
      if (result && Array.isArray(result.forecast)) {
        setForecast(result.forecast);
        setCity(result.city);
      } else {
        throw new Error("Forecast data format is incorrect.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForecast(cityName);
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

      {loading && (
        <div className="status-message loading-state">
          <div className="spinner"></div>
          <span>Fetching Forecast...</span>
        </div>
      )}

      {error && (
        <div className="status-message error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && forecast.length > 0 && (
        <div className="forecast-grid">
          {/* Loop through the forecast array and render normalized cards */}
          {forecast.map((day, index) => (
            <ForecastCard key={index} data={day} />
          ))}
        </div>
      )}

      {!loading && !error && forecast.length === 0 && !loading && (
        <div className="status-message">No forecast data found.</div>
      )}
    </div>
  );
};

export default ForecastDisplay;
