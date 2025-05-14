import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router";

// Theme Provider
import { ThemeProvider } from "./components/theme-provider/index.tsx";

// Sonner => Toast Notification
import SonnerToasterComp from "./components/library/sonner-toaster/index.tsx";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />

        <SonnerToasterComp />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
