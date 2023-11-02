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
        home: "url('./src/assets/home-bg.png')",
        restaurant: "url('./src/assets/restaurant-bg.png')",
        menu: "url('./src/assets/menu-bg.png')",
        "restEvent-1": "url('./src/assets/rest-event-1.png')",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
