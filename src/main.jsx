import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { WebsiteSettingsProvider } from "./context/WebsiteSettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WebsiteSettingsProvider>
      <App />
    </WebsiteSettingsProvider>
  </React.StrictMode>
);