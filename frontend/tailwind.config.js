module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'full-screen': '100vw',
      },
      maxWidth: {
        'full-screen': '100vw',
      },
      margin: {
        'auto': '0 auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
