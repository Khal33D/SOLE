/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"El Messiri"', '"Fraunces"', 'serif'],
      },
      colors: {
        sand: {
          50: '#fbf7f1',
          100: '#f5ecdf',
          200: '#ead6bd',
          300: '#dcbb93',
          400: '#cb9a64',
          500: '#bd8249',
          600: '#a86a3e',
          700: '#8a5234',
          800: '#6f4430',
          900: '#5b3a2b',
        },
        ocean: {
          50: '#effaf7',
          100: '#d8f2ec',
          200: '#b4e4d9',
          300: '#84cebf',
          400: '#4fb0a1',
          500: '#2f9386',
          600: '#22766c',
          700: '#1d5e58',
          800: '#1a4b48',
          900: '#173e3c',
        },
        coral: {
          50: '#fff4f0',
          100: '#ffe2d9',
          200: '#ffc4b3',
          300: '#ff9b80',
          400: '#ff6b47',
          500: '#fa4621',
          600: '#ea2f0d',
          700: '#c2230b',
          800: '#9a1f10',
          900: '#7c1d12',
        },
        ink: {
          50: '#f6f6f4',
          100: '#e7e7e3',
          200: '#cfcfca',
          300: '#aeaea6',
          400: '#86867c',
          500: '#6a6a60',
          600: '#54544c',
          700: '#454540',
          800: '#3a3a37',
          900: '#1f1f1d',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(31,31,29,0.08), 0 8px 24px -8px rgba(31,31,29,0.10)',
        lift: '0 12px 32px -12px rgba(31,31,29,0.18), 0 4px 12px -4px rgba(31,31,29,0.08)',
        glow: '0 0 0 4px rgba(47,147,134,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'scale-in': 'scale-in 0.25s ease-out both',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.16,1,0.3,1) both',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
