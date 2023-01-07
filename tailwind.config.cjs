/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    debugScreens: {
      selector: '.debug-screens',
      prefix: 'screen: ',
      position: ['bottom', 'left'],
    },
    extend: {
      spacing: {
        header: '44px',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries'), require('tailwindcss-debug-screens')],
};
