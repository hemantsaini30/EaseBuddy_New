/** @type {import('tailwindcss').Config} */
export default {
  // Enable class-based dark mode (controlled by useDarkMode hook)
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom font if needed
      // fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
