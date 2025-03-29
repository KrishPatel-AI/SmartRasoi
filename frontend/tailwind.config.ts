import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Ensure dark mode is set
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
 
  plugins: [require("tailwindcss-animate")],
};

export default config;
