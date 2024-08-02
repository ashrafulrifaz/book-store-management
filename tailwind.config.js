/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        primary: "#AF32E3",
        secondary: "#F2DAFC",
        third: "#FFE6E1",
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