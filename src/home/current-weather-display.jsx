import { useState } from "react";

function CurrentWeatherDisplay() {
  return (
    <>
      <div className="weather-container">
        <h2 className="city-name">weatherData.city</h2>
        <div className="weather-details">
          <p className="temperature">
            Temperature: <strong>weatherData.temperature °C</strong>
          </p>

          <p className="condition">
            Condition: <strong>weatherData.condition</strong>
          </p>

          <p className="humidity">
            Humidity: <strong>weatherData.humidity%</strong>
          </p>

          <p className="wind-speed">
            Wind Speed: <strong>weatherData.windSpeed m/s</strong>
          </p>
        </div>
      </div>
    </>
  );
}

export default CurrentWeatherDisplay;
