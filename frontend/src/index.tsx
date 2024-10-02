import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";

// Create the root element for rendering the app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
