export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://omni-channel-platform-backend.vercel.app';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    ME: '/auth/me',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
};

export default API_ENDPOINTS;
