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
  CONVERSATIONS: {
    LIST: '/conversations',
    MESSAGES: (id) => `/conversations/${id}/messages`,
    SEND_MESSAGE: (id) => `/conversations/${id}/messages`,
    TAKEOVER: (id) => `/conversations/${id}/takeover`,
    STATS: '/conversations/stats',
    EVENTS: '/conversations/events', // SSE endpoint
  },
};

export default API_ENDPOINTS;
