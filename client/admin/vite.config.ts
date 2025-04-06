import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// tailwindcss
import tailwindcss from "@tailwindcss/vite";

import path from "path";

// vite web font downloader (GFont)
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // tailwindcss
    tailwindcss(),

    // vite web font downloader (GFont)
    webfontDownload(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
