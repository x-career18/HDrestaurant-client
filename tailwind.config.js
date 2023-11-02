/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beVietnam: ["Be Vietnam Pro", "sans-serif"],
        waterBrush: ["Water Brush", "cursive"],
      },
      backgroundImage: {
        // home: "url('./images/home-bg.png')",
        restaurant: "url('./images/restaurant-bg.png')",
        menu: "url('./images/menu-bg.png')",
        "restEvent-1": "url('./images/rest-event-1.png')",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
