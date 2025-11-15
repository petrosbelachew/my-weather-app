# Current Weather Display Application

This is a simple, modern web application for displaying current weather conditions for a searched city. It is built using **React** with **Vite** as the build tool and styled with **Pure CSS**.

## 🚀 Project Structure

This project relies on three key files, which should reside in your source directory (e.g., `src/`):

1. `CurrentWeatherDisplay.jsx`: The main React component containing the UI logic.

2. `weather-api-current.js`: A JavaScript utility file for handling API calls (OpenWeatherMap).

3. `weather-display-styles.css`: The pure CSS file providing the application's styling and responsiveness.

## ✅ Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- **Bun** (which includes a fast JavaScript runtime, package manager, and bundler)

## 🔧 Installation and Setup

Follow these steps to set up the project locally using **Bun**:

### 1. Initialize a Vite React Project

If you haven't already, you can start a new project:

# Create a new React project using Bun's Vite template

bun create vite weather-app --template react
cd weather-app

# Install dependencies using Bun

bun install

2. Add Project Files
   Place the following files into your project's src/ directory:

CurrentWeatherDisplay.jsx

weather-api-current.js

weather-display-styles.css

3. API Key Configuration
   The API utility file, weather-api-current.js, uses a placeholder key. For the application to fetch live data, you must update the API_KEY variable:

File: src/weather-api-current.js

JavaScript

// Locate this line in weather-api-current.js and replace the key
const API_KEY = "YOUR_ACTUAL_OPENWEATHERMAP_API_KEY_HERE"; 4. Update the Run Script (Optional)
Bun uses the dev script defined in your package.json. If you created the project with Vite, this is usually set up correctly.

▶️ Usage
Once the setup is complete, you can run th
e application using the standard Bun command:

# Run the development server using Bun

bun dev
The application will start, usually accessible at http://localhost:5173/ (or another port if 5173 is in use).

```

```
