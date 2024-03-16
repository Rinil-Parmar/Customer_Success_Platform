/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "80%",
      },
    },
  },
  plugins: [],
};
