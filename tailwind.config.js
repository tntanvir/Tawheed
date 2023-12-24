const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        blueo: "#1d4ed8",
        grayh: "#323232",
        grayr: "#27272a"

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

  },
  plugins: [],

});