import { useState } from "react";

// import { handleSubmit } from "../api/weather/get-current.js";

import "./SearchInput.css";

function SearchInput() {
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
}
export default SearchInput;
