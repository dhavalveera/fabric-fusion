import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router";

// React Toastify
import { ToastContainer } from "react-toastify";

// Theme Provider
import { ThemeProvider } from "./components/theme-provider/index.tsx";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>

      <ToastContainer newestOnTop position="top-right" />
    </BrowserRouter>
  </StrictMode>,
);
