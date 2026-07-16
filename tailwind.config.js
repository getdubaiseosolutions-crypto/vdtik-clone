/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "#0B1120",
        surface: "#111a2e",
        edge: "#1e2c4a",
        mist: "#8ea0c4",
        signal: "#4ADE80",   // grab green
        signal2: "#22d3ee",  // cyan
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74,222,128,0.25), 0 20px 60px -20px rgba(74,222,128,0.35)",
      },
    },
  },
  plugins: [],
};
