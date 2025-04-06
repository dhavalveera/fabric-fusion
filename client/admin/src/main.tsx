import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router";

// React Toastify
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />

      <ToastContainer newestOnTop position="top-right" />
    </BrowserRouter>
  </StrictMode>,
);
