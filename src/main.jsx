// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// import semua css global di sini
import "./app.css";
import "./Style/index.css";
import "./Style/pengetahuan.css";
import "./Style/Kuis/tes-pengetahuan.css";
import "./Style/Kuis/kuis.css";
import "./Style/AboutPage.css";
import "./Style/Pengetahuan/detail-knowledge.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
