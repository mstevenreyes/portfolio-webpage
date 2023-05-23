/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
            './src/**/*.{html,js}'],
  theme: {
    extend: {},
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    }
  },
  plugins: [],
}
