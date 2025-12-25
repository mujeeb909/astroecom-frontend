/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4142FE',
          50: '#EEEEFF',
          100: '#D9DAFF',
          200: '#B6B7FF',
          300: '#9294FE',
          400: '#6F71FE',
          500: '#4142FE',
          600: '#3435CB',
          700: '#272898',
          800: '#1A1B65',
          900: '#0C0D33',
        },
        surface: {
          light: '#FFFFFF',
          'light-alt': '#F9FAFB',
          dark: '#1E293B',
          'dark-alt': '#0F172A',
        },
        text: {
          primary: {
            light: '#101828',
            dark: '#FFFFFF',
          },
          secondary: {
            light: '#667085',
            dark: '#94A3B8',
          },
        },
        border: {
          light: '#EAECF0',
          dark: '#334155',
        },
        success: '#12B76A',
        warning: '#F79009',
        error: '#F04438',
        whatsapp: '#25D366',
        facebook: '#1877F2',
        instagram: '#E4405F',
        google: '#4285F4',
        meta: '#0668E1',
        messenger: '#0081FF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'button': '8px',
        'card': '12px',
        'bubble': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
