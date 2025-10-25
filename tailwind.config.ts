import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#4f46e5',
      },
    },
  },
  plugins: [],
};
