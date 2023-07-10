/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "anti-flash-white": "#F3F4F6",
        "platinum": "#E7E7E9",
        "eerie-black": "#111827",
        "auro-metal-saurus": "#6B7280",
        "majorelle-blue": "#4F46E5",
        "nyanza": "#DCFCE7",
        "misty-rose": "#FEE2E2",
        "ruby-red": "#991B1B",
        "dark-spring-green": "#166534"
      },
      screens: {
        '3xl': '1880px',
        '4xl': '2280px'
      }
    },
  },
  plugins: [],
}

