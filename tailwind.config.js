/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/index.ejs"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
