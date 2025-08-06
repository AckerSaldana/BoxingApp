/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boxing: {
          red: '#C41E3A',
          gold: '#FFD700',
          dark: '#1a1a1a',
          darker: '#0d0d0d',
        }
      },
      fontFamily: {
        boxing: ['Impact', 'Helvetica Neue', 'Arial Black', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'punch': 'punch 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        punch: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(-5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        }
      }
    },
  },
  plugins: [
    '@tailwindcss/forms',
  ],
}