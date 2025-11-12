// Filename: get-forecast.js

// --- CONFIGURATION ---
const API_KEY = "7eab94c5cb9c0afb960e24d00e5cd75d"; // Replace with your actual key
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
// ---------------------

/**
 * Extracts key daily data points from the raw 3-hourly forecast list.
 * We select the entry closest to noon (12:00 PM) for each of the next 5 days.
 * @param {Array} list - The raw forecast list from the API response.
 * @returns {Array} An array of simplified daily forecast objects.
 */
const processForecastData = (list) => {
  const dailyForecasts = [];
  const processedDates = new Set();

  for (const item of list) {
    const dateObj = new Date(item.dt * 1000);
    // Format date as YYYY-MM-DD for easy grouping
    const dateKey = dateObj.toISOString().split("T")[0];
    const hour = dateObj.getHours();

    // Check if it's the 12 PM time slot AND we haven't processed this day yet
    if (hour >= 11 && hour <= 13 && !processedDates.has(dateKey)) {
      processedDates.add(dateKey);

      dailyForecasts.push({
        // Format the date for display (e.g., "Mon, Nov 12")
        date: dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        temp: item.main.temp.toFixed(0), // Round temp to nearest whole number
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      });
    }

    // Stop after getting 5 days
    if (dailyForecasts.length >= 5) break;
  }
  return dailyForecasts;
};

/**
 * Fetches the 5-day weather forecast from the OpenWeatherMap API.
 * @param {string} cityName - The city to fetch the forecast for.
 * @returns {object} An object containing the city name and the 5-day forecast array.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchWeatherForecast = async (cityName) => {
  const apiUrl = `${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      // Use the API's error message if available, or a generic one
      throw new Error(
        data.message || `Could not find forecast for "${cityName}".`
      );
    }

    const forecast = processForecastData(data.list);

    return {
      // Use the city name corrected by the API (e.g., 'London' instead of 'lonDon')
      city: data.city.name,
      forecast: forecast,
    };
  } catch (error) {
    // Re-throw the error so the component can catch it and display a message
    throw new Error(
      error.message || "A network error occurred while fetching data."
    );
  }
};
