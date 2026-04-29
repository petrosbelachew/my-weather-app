import React from "react";
import "./weather-card.css";
const WeatherCard = ({ data, isCurrent = false }) => {
  // Debug: See what is actually arriving in the card
  // console.log("WeatherCard received:", data);

  if (!data) return <p>No data available</p>;

  // Use the property names your API is actually sending
  const { date, temperature, condition, humidity, windSpeed, icon } = data;
  console.log("check", humidity);
  return (
    /* We add a specific class if it's for the forecast grid */
    <div
      className={`weather-card ${isCurrent ? "current-view" : "forecast-view"}`}
    >
      <p className="card-date">{date || "Today"}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={condition}
        className="card-icon"
      />
      <p className="card-temp">{Math.round(temperature)}°C</p>
      <p className="card-description">{condition}</p>
      {/* CONDITIONAL RENDERING: Only shows if isCurrent is true */}
      {isCurrent && (
        <div className="description-section">
          <div className="current-details">
            <p>Humidity: {humidity}%</p>
            <p>Wind: {windSpeed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
