import type { Config } from "tailwindcss";

// flowbite-react
import { content as FRContent, plugin as FRPlugin } from "flowbite-react/tailwind";

export default {
  content: [
    // flowbite-react
    FRContent(),

    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
    },
  },
  plugins: [
    // flowbite-react
    FRPlugin(),

    require("@tailwindcss/typography"),
  ],
} satisfies Config;
