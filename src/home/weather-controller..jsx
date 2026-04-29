import React, { useState } from "react";
import CurrentWeatherApp from "./current-weather-display.jsx";
import ForecastDisplay from "./forecast-display.jsx";
import "./weather-controller.css";
const WeatherController = () => {
  // 1. selection: what the user is currently picking in the dropdown list
  const [selection, setSelection] = useState("current");

  // 2. activeView: what is actually showing on the screen right now
  const [activeView, setActiveView] = useState("current");

  const handleSwitch = (e) => {
    e.preventDefault();
    // Update the UI only when the button is clicked
    setActiveView(selection);
  };

  return (
    <div className="weather-dashboard">
      {/* --- Unified Navigation Form --- */}
      <form className="view-selector-form" onSubmit={handleSwitch}>
        <div className="dropdown-group">
          <label htmlFor="view-select">Choose View:</label>
          <select
            id="view-select"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className="modern-dropdown"
          >
            <option value="current">Current Weather</option>
            <option value="forecast">5-Day Forecast</option>
          </select>
        </div>

        <button type="submit" className="submit-view-btn">
          Update View
        </button>
      </form>

      {/* --- The Dynamic View Area --- */}
      <div className="display-area">
        {activeView === "current" ? <CurrentWeatherApp /> : <ForecastDisplay />}
      </div>
    </div>
  );
};

export default WeatherController;
