import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './apiEndpoints';

export const conversationsApi = createApi({
  reducerPath: 'conversationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Conversations', 'Messages'],
  endpoints: (builder) => ({
    // GET /conversations - Fetch all conversations
    getConversations: builder.query({
      query: () => '/conversations',
      providesTags: ['Conversations'],
      transformResponse: (response) => {
        // Normalize the response
        return {
          conversations: response.conversations || [],
        };
      },
    }),

    // GET /conversations/:id/messages - Fetch messages for a conversation
    getMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 50 }) =>
        `/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
      providesTags: (result, error, { conversationId }) =>
        [{ type: 'Messages', id: conversationId }],
      transformResponse: (response) => {
        // Messages come in reverse order (newest first), keep as is for display
        return {
          messages: response.messages || [],
          success: response.success,
        };
      },
    }),

    // POST /conversations/:id/messages - Send text message
    sendMessage: builder.mutation({
      query: ({ conversationId, text, messageType = 'text' }) => ({
        url: `/conversations/${conversationId}/messages`,
        method: 'POST',
        body: { text, messageType },
      }),
      invalidatesTags: (result, error, { conversationId }) =>
        [{ type: 'Messages', id: conversationId }, 'Conversations'],
      transformResponse: (response) => {
        return {
          message: response.message,
          success: true,
        };
      },
    }),

    // POST /conversations/:id/messages - Send message with file
    sendMessageWithFile: builder.mutation({
      query: ({ conversationId, text, file }) => {
        const formData = new FormData();
        formData.append('text', text || '');
        formData.append('file', file);
        formData.append('messageType', 'text'); // Auto-detected by backend

        return {
          url: `/conversations/${conversationId}/messages`,
          method: 'POST',
          body: formData,
          // Don't set Content-Type header, let browser set it with boundary
        };
      },
      invalidatesTags: (result, error, { conversationId }) =>
        [{ type: 'Messages', id: conversationId }, 'Conversations'],
      transformResponse: (response) => {
        return {
          message: response.message,
          success: true,
        };
      },
    }),

    // POST /conversations/:id/takeover - Toggle automation
    toggleAutomation: builder.mutation({
      query: ({ conversationId }) => ({
        url: `/conversations/${conversationId}/takeover`,
        method: 'POST',
      }),
      invalidatesTags: ['Conversations'],
      transformResponse: (response) => {
        return {
          success: response.success,
          message: response.message,
          automationEnabled: response.automation_enabled,
        };
      },
    }),

    // GET /conversations/stats - Dashboard statistics
    getStats: builder.query({
      query: () => '/conversations/stats',
      transformResponse: (response) => {
        return {
          stats: response.stats || {
            unread: 0,
            pending: 0,
            resolved: 0,
            platforms: {
              whatsapp: 0,
              facebook: 0,
              instagram: 0,
            },
          },
        };
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useSendMessageWithFileMutation,
  useToggleAutomationMutation,
  useGetStatsQuery,
} = conversationsApi;
