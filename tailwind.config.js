/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AF32E3",
        secondary: "#F2DAFC",
        third: "#FFE6E1",
        fourth: "#FFF2EF",
        baground: '#FBF1FC',
        secondbg: '#FFFCFB',
        border: '#D9D9D9',
        description: '#484747'
      },
      fontFamily: {
        primary: ["Manrope", "sans-serif"],
        secondary: ["Rubik", 'sans-serif']
      }
    },
  },
  plugins: [],
}