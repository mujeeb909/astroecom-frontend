export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://omni-channel-platform-backend.vercel.app';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    CONNECTIONS: '/auth/connections',
    DISCONNECT: '/auth/disconnect',
  },
  USER: {
    PROFILE: '/users/profile',
  },
};

export default API_ENDPOINTS;
