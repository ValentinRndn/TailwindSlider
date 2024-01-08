/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../../**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "sliderSM" : "750px",
        "sliderMD" : "950px", 
      }
    },
  },
  plugins: [],
}

