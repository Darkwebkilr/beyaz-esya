/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // ❌ BUNU YAPMAYIN:
    // './**/*.{js,ts,jsx,tsx}'  // Tüm projeyi tarıyor!
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // 🔥 Ekleyin:
  safelist: [],
  blocklist: [],
};
