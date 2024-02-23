const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#14052a",
        secondary: "#23224a",
        tertiary: "#71798a",
        clean: "#f0ece5",
        vclean: "#ffffff",
        ...colors,
      },
    },
  },
  plugins: [],
};
