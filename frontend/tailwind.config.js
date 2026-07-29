/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#071426", 900: "#0b1f3a", 800: "#12345b" },
        tech: { 600: "#1769ff", 500: "#2f80ff", 400: "#5ea0ff" },
      },
      boxShadow: { panel: "0 18px 50px rgba(7, 20, 38, 0.10)" },
    },
  },
  plugins: [],
};
