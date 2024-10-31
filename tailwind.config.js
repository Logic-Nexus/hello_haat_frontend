/** @type {import('tailwindcss').Config} */
import { themeColor } from "./src/constant/index";

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./public/**/*.html"],
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      "animate-bounce": "bounce 3s infinite",
      "right-bounce": "rightBounce 4s infinite",
      "pulse-slow": "pulse 2s infinite",
      text: "text 2s ease infinite",
      spin: "spin 2s linear infinite",
    },
    keyframes: {
      spin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      pulse: {
        "0%, 100%": {
          transform: "scale(1)",
          borderRadius: "0.3125rem",
        },
        "50%": {
          transform: "scale(1.05)",
          borderRadius: "0.625rem",
        },
      },

      rightBounce: {
        "0%, 100%": {
          transform: "translateX(0)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateX(10px)",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
      text: {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(0)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateY(-10px)",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
    },
    colors: {
      ...require("tailwindcss/colors"),
      ...themeColor,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
// require("@tailwindcss/forms")
