/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        "primary-light": "var(--primary-light)",
        "secondary-light": "var(--secondary-light)",
        "tertiary-light": "var(--tertiary-light)",
        "primary-dark": "var(--primary-dark)",
        "secondary-dark": "var(--secondary-dark)",
        "tertiary-dark": "var(--tertiary-dark)",
      },
    },
  },
  darkMode: "class",
}
