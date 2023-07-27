/** @type {import('tailwindcss').Config} */
import ALL from "./ALL.config";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: ALL.lightBackground || "#fff",
        },
        night: {
          DEFAULT: ALL.darkBackground || "#000",
        },
        primaryColor: {
          DEFAULT: ALL.primaryColor || "#6455c7",
        },
        primaryColorD: {
          DEFAULT: ALL.primaryColorD || "#6455c7",
        },
      },
    },
  },

  plugins: [],
};
