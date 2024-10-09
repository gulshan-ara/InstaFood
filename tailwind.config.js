/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
            backgroundColor: "rgba(0,255,0,0.5)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
            backgroundColor: "rgba(255,255,255,1)",
          },
        },
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
