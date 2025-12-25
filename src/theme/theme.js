// Central theme configuration - Single source of truth for all design tokens
export const theme = {
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
    light: {
      surface: '#FFFFFF',
      surfaceAlt: '#F9FAFB',
      textPrimary: '#101828',
      textSecondary: '#667085',
      border: '#EAECF0',
    },
    dark: {
      surface: '#1E293B',
      surfaceAlt: '#0F172A',
      textPrimary: '#FFFFFF',
      textSecondary: '#94A3B8',
      border: '#334155',
    },
    semantic: {
      success: '#12B76A',
      warning: '#F79009',
      error: '#F04438',
    },
    chat: {
      sent: '#4142FE',
      received: '#F2F4F7',
    },
    platforms: {
      whatsapp: '#25D366',
      facebook: '#1877F2',
      instagram: '#E4405F',
      google: '#4285F4',
      meta: '#0668E1',
      messenger: '#0081FF',
    },
  },

  typography: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
      h2: ['30px', { lineHeight: '1.3', fontWeight: '600' }],
      h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
      body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      bodySm: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      small: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  borderRadius: {
    button: '8px',
    card: '12px',
    bubble: '16px',
  },

  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    cardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export default theme;
