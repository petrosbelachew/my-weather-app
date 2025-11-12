import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchInput from "./common/searchinput.jsx";
import CurrentWeatherDisplay from "./home/current-weather/current-weather-display.jsx";
import ForecastDisplay from "./home/forecast-display.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchInput />
    <CurrentWeatherDisplay />
    <ForecastDisplay />

    <App />
  </StrictMode>
);
