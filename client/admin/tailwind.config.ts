import type { Config } from "tailwindcss";

// flowbite-react
import { content as FRContent, plugin as FRPlugin } from "flowbite-react/tailwind";

export default {
  darkMode: "class",
  content: [
    // flowbite-react
    FRContent(),

    // Preline
    "./node_modules/preline/preline.js",

    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-marine-blue": "#02295a",
        "primary-purplish-blue": "#473dff",
        "primary-pastel-blue": "#adbeff",
        "primary-light-blue": "#bfe2fd",
        "primary-starberry-red": "#ed3548",
        "neutral-cool-gray": "#9699ab",
        "neutral-light-gray": "#d6d9e6",
        "neutral-magnolia": "#f0f6ff",
        "neutral-alabaster": "#fafbff",
        "bg-color": "#012428",
        primaryColor: "#0391a0",
        secondaryColor: "#f4822e",
        "btn-color": "#f26820",
      },
      fontFamily: {
        primaryFont: ['"Della Respira", serif', "ui-sans-serif", "system-ui", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
    },
  },
  plugins: [
    // flowbite-react
    FRPlugin(),

    // Preline
    require("preline/plugin"),

    require("@tailwindcss/typography"),

    require("@tailwindcss/forms"),
  ],
} satisfies Config;
