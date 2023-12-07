/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': {
        'dark-blue': '#202D41',
        'blue': '#3784F4',
        'danger': '#D83636',
        'backgroud-blue': '#F4F8FF',
        'yellow': 'rgb(253 224 71)'
      },
      'neutral': {
        'dim-grey': '#5B5B5B',
        'silver': '#BDBDBD',
        'white-smoke': '#E9E9E9',
        'white': '#FFFFFF',
      }
    },
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
      },
      lineHeight: {
        'clamp-2': '2.6rem',
      },
    },
    variants: {
      fill: ['hover', 'focus'], // this line does the trick
      extend: {
        lineHeight: ['responsive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}