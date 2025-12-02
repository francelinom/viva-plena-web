/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A38C",
        secondary: "#FF8A65",
        "background-light": "#F8FAFC",
        "background-dark": "#1E293B",
      },
    },
  },
  plugins: [],
};
