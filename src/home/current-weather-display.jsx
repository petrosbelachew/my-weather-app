import React, { useState, useEffect } from "react";
// Import the asynchronous function from your new JS file
import { fetchCurrentWeather } from "../api/weather/get-current.js";

// NOTE: You can pass CITY_NAME as a prop if you want to make it reusable
const INITIAL_CITY = "London";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the imported JS function
    fetchCurrentWeather(INITIAL_CITY)
      .then((data) => {
        setWeatherData(data);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // --- Rendering Logic (JSX) ---
  if (loading) {
    return <div className="weather-container">Loading weather data...</div>;
  }

  if (error) {
    return <div className="weather-container error">Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      <h2 className="city-name">{weatherData.city}</h2>
      <div className="weather-details">
        <p className="temperature">
          Temperature: <strong>{weatherData.temperature}°C</strong>
        </p>

        <p className="condition">
          Condition: <strong>{weatherData.condition}</strong>
        </p>

        <p className="humidity">
          Humidity: <strong>{weatherData.humidity}%</strong>
        </p>

        <p className="wind-speed">
          Wind Speed: <strong>{weatherData.windSpeed} m/s</strong>
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
