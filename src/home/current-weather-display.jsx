import React, { useState, useCallback, useEffect } from "react";
// Replacing external imports with internal definitions to bypass resolution errors.
// These mock data structures allow the component logic to execute correctly.
// import "C:/Users/acer/my-weather-app/src/home/current-weather-styles.css";
import { cityName } from "./utils/configs/api-config";

// Mock implementation of the API call that simulates a successful fetch
const fetchCurrentWeather = (city) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedCity = city.trim().toLowerCase();

      if (normalizedCity === "london") {
        resolve({
          city: "London",
          current: {
            temperature: 15.5,
            condition: "light rain",
            humidity: 78,
            windSpeed: 4.1,
            icon: "10d",
          },
        });
      } else if (normalizedCity === "paris") {
        resolve({
          city: "Paris",
          current: {
            temperature: 19.4,
            condition: "clear sky",
            humidity: 68,
            windSpeed: 2.1,
            icon: "01d",
          },
        });
      } else {
        // Simulate an API error for unknown cities
        reject(
          new Error(
            `Could not find weather for "${city}". Please check your API key/configuration.`
          )
        );
      }
    }, 500); // Simulate network latency
  });
};
// --- END: Internal Dependencies ---

// --- START: CurrentWeatherDisplay Component ---
/**
 * Displays the current weather details in a formatted card.
 * @param {object} weatherData - Contains city and current weather details.
 */
const CurrentWeatherDisplay = ({ weatherData }) => {
  // CRITICAL GUARD: Ensure we have both weatherData and the nested 'current' object
  if (!weatherData || !weatherData.current) {
    return null;
  }

  const { city, current } = weatherData;
  const { temperature, condition, humidity, windSpeed, icon } = current;

  // Robust Temperature Formatting
  const tempValue = parseFloat(temperature);
  const formattedTemp =
    !isNaN(tempValue) && isFinite(tempValue) ? tempValue.toFixed(1) : "N/A";

  // The OpenWeatherMap icon URL structure
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : "https://placehold.co/80x80/cccccc/000000?text=NA";

  return (
    <div className="weather-container display-card">
      <h2 className="weather-city-name">{city}</h2>

      <div className="weather-main-info">
        <div className="temperature-section">
          {/* Weather Icon based on API data */}
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
// --- END: CurrentWeatherDisplay Component ---

// --- START: Main Component ---
const CurrentWeatherApp = () => {
  // Initial state now relies on the internal cityName
  const [city, setCity] = useState(cityName);
  const [inputCity, setInputCity] = useState(cityName);
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
      // Call the internal mock function
      const data = await fetchCurrentWeather(targetCity);

      setWeatherData(data);
      // Set the displayed city name from the successful response
      setCity(data.city);
      // Reset input city to the successful city name
      setInputCity(data.city);
    } catch (err) {
      // Display error from the mock failure
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
    if (inputCity.trim()) {
      loadWeather(inputCity.trim());
    }
  };

  return (
    <>
      <div className="app-main-container">
        <h1 className="app-title">Current Weather Search</h1>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name (e.g., Paris)"
            className="city-input"
            aria-label="City Name"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <h2 className="city-header">
          Current conditions for <span className="highlight-city">{city}</span>
        </h2>

        {/* --- Conditional Display --- */}
        <div className="status-container">
          {/* Loading State */}
          {loading && (
            <div className="status-message loading-state">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className="status-message weather-container error"
              role="alert"
            >
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Weather Data Display */}
          {weatherData && !loading && !error && (
            <CurrentWeatherDisplay weatherData={weatherData} />
          )}

          {/* Initial/Empty State */}
          {!weatherData && !loading && !error && (
            <p className="status-message">
              Enter a city name to see the weather!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherApp;
