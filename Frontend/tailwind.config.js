/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: 'var(--primary-green)',
        },
        orange: {
          DEFAULT: 'var(--primary-orange)',
          dark: 'var(--primary-orange-600)',
        },
        white: {
          DEFAULT: 'var(--text-white)',
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        sans: ["Nunito", "sans-serif"], // default font
      },
    },
  },
  plugins: [],
};
