import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F1',
        pearl: '#FFFDF8',
        champagne: '#D8B65A',
        gold: '#B8912E',
        ink: '#171411',
        charcoal: '#3A332B',
        line: '#E9DEC7',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(72, 52, 20, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
