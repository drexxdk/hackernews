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
    screens: {
      xs: '600px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
    },
    containers: {
      xs: '600px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
    },
    extend: {
      aspectRatio: {
        '16/9': '16 / 9',
        '4/3': '4 / 3',
      },
      spacing: {
        header: '44px',
      },
      padding: {
        container: '12px',
      },
      maxWidth: {
        container: '760px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/line-clamp'),
  ],
};
