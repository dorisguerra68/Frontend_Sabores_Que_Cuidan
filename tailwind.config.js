/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sqc: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        sqc: {
          green: "#185a4a",
          greenLight: "#bcead7",
          dark: "#2F2F2F",
          cream: "#ecc787",
        },
      },
    },
  },
  plugins: [],
};
