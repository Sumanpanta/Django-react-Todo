/** @type {import('tailwindcss').Config} */
export default {
  // have to use this in content to use tailwind css 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",          
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui') ],               //daisy ui plugin chalauna: you have  to use it here. 
}

