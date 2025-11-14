import React, { useState, useCallback, useEffect } from "react";
// Import the asynchronous function from your new JS file
import { fetchCurrentWeather } from "../api/get-current.js";
import { cityName } from "./utils/configs/api-config.js";

// --- START: New CurrentWeatherDisplay Component ---
/**
 * A presentational component to display the fetched weather data.
 * @param {object} props - The component props.
 * @param {object} props.weatherData - The structured weather data object.
 */
const CurrentWeatherDisplay = ({ weatherData }) => {
  // Destructure the current data for easier access
  const { city, current } = weatherData;
  const { temperature, condition, humidity, windSpeed, icon } = current;

  // IMPORTANT: Format the temperature here for display purposes.
  // We use .toFixed(1) to show one decimal place.
  const formattedTemp =
    typeof temperature === "number"
      ? temperature.toFixed(1)
      : parseFloat(temperature).toFixed(1); // Handles if it's accidentally still a string

  // The OpenWeatherMap icon URL structure
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-container display-card">
      <h2 className="weather-city-name">{city}</h2>

      <div className="weather-main-info">
        <div className="temperature-section">
          <img src={iconUrl} alt={condition} className="weather-icon" />
          <p className="temperature-value">{formattedTemp}°C</p>
        </div>
        <p className="weather-condition">{condition}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <strong>Humidity:</strong> <span>{humidity}%</span>
        </div>
        <div className="detail-item">
          <strong>Wind Speed:</strong> <span>{windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};
// --- END: New CurrentWeatherDisplay Component ---

// --- START: Main Component ---
const CurrentWeatherApp = () => {
  const [cityInput, setCityInput] = useState(cityName);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles the API call and state updates
  const loadWeather = useCallback(async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchCurrentWeather(targetCity);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load default city on mount
  useEffect(() => {
    loadWeather(cityName);
  }, [loadWeather]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      loadWeather(cityInput.trim());
    }
  };

  return (
    <div className="app-main-container">
      <h1 className="app-title">Current Weather Search</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name (e.g., Paris)"
          className="city-input"
          aria-label="City Name"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* --- Conditional Display --- */}

      {/* Loading State */}
      {loading && (
        <div className="status-message loading-state">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="status-message weather-container error" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Weather Data Display - Uses the new CurrentWeatherDisplay component */}
      {weatherData && !loading && !error && (
        <CurrentWeatherDisplay weatherData={weatherData} />
      )}

      {/* Initial/Empty State */}
      {!weatherData && !loading && !error && (
        <p className="status-message">Enter a city name to see the weather!</p>
      )}
    </div>
  );
};

export default CurrentWeatherApp;
