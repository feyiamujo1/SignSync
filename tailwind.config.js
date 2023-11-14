/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1759da",
        "transparent-black": "rgba(1,1, 0.8)"
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        "custom-stuff": "1px 3px 10px 0px #1B1B1B1A;"
      },
    },
  },
  plugins: [],
}

