import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchInput from "./common/SearchInput.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchInput />
    <App />
  </StrictMode>
);
