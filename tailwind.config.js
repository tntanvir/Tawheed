const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        blueo: "#1d4ed8",
        grayh: "#323232",
        grayr: "#27272a",
        // ------hadis tag-----------
        Hasan: "#9fd568",
        Daif: "#ff8c00",
        Sahih: "#008000",
        Shadh: "#ffb6c1",
        Munkar: "#ff69b4",
        Mawdu: "#ff0000",


      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

  },
  plugins: [],

});