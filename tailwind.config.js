/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        "primary-light": "#63b3ed",
        "primary-dark": "#0056b3",
      },
    },
  },
  plugins: [],
};
