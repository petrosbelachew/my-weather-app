import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CurrentWeatherDisplay from "./home/current-weather-display.jsx";
import ForecastDisplay from "./home/forecast-display.jsx";
import WeatherController from "./home/weather-controller..jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherController />
    <App />
  </StrictMode>,
);
