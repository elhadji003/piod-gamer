/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/**/*.js",
  ],
  theme: {
    extend: {
      darkMode: "class",
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px #f472b6, 0 0 10px #f472b6" },
          "50%": { boxShadow: "0 0 10px #f472b6, 0 0 10px #f472b6" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shake: "shake 0.9s ease-in-out infinite",
      },
      colors: {
        "neon-green": "#39FF14",
        "neon-purple": "#9D00FF",
        "neon-red": "#FF3131",
      },
      dropShadow: {
        neon: "0 0 6px #ec4899",
        neonGreen: "0 0 6px #39FF14",
        neonWhite: "0 0 6px rgb(255, 255, 255)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
