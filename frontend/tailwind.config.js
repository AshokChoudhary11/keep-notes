/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7AB2B2',
          light: '#9BC9C9',
          dark: '#5A9494',
        },
        secondary: {
          DEFAULT: '#CDE8E5',
          light: '#E8F5F4',
          dark: '#A8D5D2',
        },
        accent: {
          peach: '#EEE0C9',
          salmon: '#F0A898',
          orange: '#E89F71',
          green: '#4CAF50',
          red: '#E74C3C',
        },
        background: {
          primary: '#F5F5DC',
          card: '#FFFFFF',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
        text: {
          primary: '#4A4A4A',
          secondary: '#6B6B6B',
          light: '#9E9E9E',
        }
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.2)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

