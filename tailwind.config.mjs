/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'amorwealth-indigo': '#4A55A2',
        'soft-blue': '#7885CB',
        'pale-slate': '#F4F6F9',
        'pure-white': '#FFFFFF',
        'growth-green': '#4CAF50',
        'alert-orange': '#FF9800',
        'dark-charcoal': '#333333',
      },
      borderRadius: {
        'input': '8px',
        'btn': '12px',
      }
    },
  },
  plugins: [],
};

export default config;
