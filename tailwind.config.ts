import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0b0d",
          700: "#222227",
          500: "#4a4a52",
          300: "#8b8b96"
        }
      }
    }
  },
  plugins: []
};

export default config;
