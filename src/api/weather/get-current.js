import { API_KEY, DEFAULT_CITY } from "../../home/utils/configs/api-config";

// const API_KEY = "7eab94c5cb9c0afb960e24d00e5cd75d"; // Replace with your actual key
// const DEFAULT_CITY = "London";

// Export the primary function to be used by React component
export const fetchCurrentWeather = async (cityName = DEFAULT_CITY) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL);

    // Check for a non-200 status code (e.g., 404 City not found, 401 Unauthorized)
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} - City not found or API issue.`
      );
    }

    const data = await response.json();

    // Extract and structure the specific data fields required by your JSX component
    const extractedData = {
      city: data.name,
      temperature: data.main.temp.toFixed(1),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed.toFixed(1), // Wind speed in m/s (metric units)
    };

    return extractedData;
  } catch (error) {
    // Log the error for debugging and re-throw a simpler error for the component to handle
    console.error("Error in fetchCurrentWeather:", error);
    throw new Error(error.message || "Failed to retrieve weather data.");
  }
};
