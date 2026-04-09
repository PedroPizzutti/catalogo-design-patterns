/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#403D3E",
          dark: "#262526",
        },

        bg: "#F2F2F2",
        surface: "#FFFFFF",

        content: {
          DEFAULT: "#262526",
          secondary: "#736F70",
        },

        border: "#BFBDBE",
      },
    },
  },
  plugins: [],
};
