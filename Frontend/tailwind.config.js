/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in": "slideIn 1s ease-out forwards",
        "fade-in": "fadeIn 1s ease-in forwards",
        "pulse-slow": "pulse 2s infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-50px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      boxShadow: {
        "3d-light": "0 10px 15px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.2)",
        "3d-heavy": "0 15px 30px rgba(0, 0, 0, 0.3), 0 25px 50px rgba(0, 0, 0, 0.4)",
      },
      colors: {
        gradientStart: "#3b82f6", // Blue
        gradientEnd: "#9333ea", // Purple
      },
    },
  },
  plugins: [],
};
