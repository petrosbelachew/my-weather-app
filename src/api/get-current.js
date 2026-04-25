import {
  BASE_URL_CURRENT,
  cityName,
  API_KEY,
} from "../home/utils/configs/api-config.js";
/**
 * Fetches current weather data for a given city, structured similarly to a forecast result.
 * @param {string} cityName The name of the city to search for.
 * @returns {object} Structured current weather data in a 'current' key.
 */
export const fetchCurrentWeather = async (cityName) => {
  const apiUrl = `${BASE_URL_CURRENT}?q=${cityName}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Could not find weather for "${cityName}".`,
      );
    }

    // Safety Check: Ensure 'main' and 'weather' exist before accessing properties
    if (!data.main || !data.weather) {
      throw new Error("Unexpected API response format.");
    }

    // Structure the data to match the expected result object
    return {
      city: data.name,
      current: {
        city: data.name,
        temperature: Math.round(data.main.temp), // Rounding for cleaner UI
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      },
    };
  } catch (error) {
    throw new Error(
      error.message || "A network error occurred while fetching data.",
    );
  }
};
