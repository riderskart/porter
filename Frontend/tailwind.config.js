/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "320px",
      tablet: "760px",
      laptop: "1280px",
      desktop: "1320px",
    },
    extend: {
      fontFamily: {
        Exo: ["Exo"],
        Knewave: ["Knewave"],
        Fredoka: ["Fredoka"],
      },
    },
  },
  plugins: [],
};
