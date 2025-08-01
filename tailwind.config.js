/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/assets/images/blurBgBlueBottomCorner.png')", // adjust path
      },
    },
  },
  plugins: [],
}