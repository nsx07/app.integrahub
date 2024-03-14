const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}", './node_modules/preline/preline.js',],
  theme: {
    colors: {
      "primary": "#14052a",
      "secondary": "#23224a",
      "tertiary": "#71798a",
      "clean": "#f0ece5",
      "very-clean": "#ffffff",
      ...colors
    },
    extend: {
      width: {
        "90%": "90%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),

  ],
}
