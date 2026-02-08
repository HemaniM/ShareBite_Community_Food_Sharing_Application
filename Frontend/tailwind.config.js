/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        sans: ["Nunito", "sans-serif"], // default font
      },
    },
  },
  plugins: [],
};
