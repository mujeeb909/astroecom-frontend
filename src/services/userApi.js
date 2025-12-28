import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINTS } from './apiEndpoints';
import { setConnections } from '../features/user/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => API_ENDPOINTS.USER.PROFILE,
    }),
    getConnections: builder.query({
      query: () => API_ENDPOINTS.AUTH.CONNECTIONS,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setConnections(data));
        } catch (err) {
          console.error('Failed to fetch connections:', err);
        }
      },
    }),
    disconnectIntegration: builder.mutation({
      query: ({ platform, accountId }) => ({
        url: `${API_ENDPOINTS.AUTH.DISCONNECT}/${platform}/${accountId}`,
        method: 'DELETE',
      }),
      // Invalidate tags or update cache could be added here if we were using tags
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Refetch connections to update UI
          dispatch(userApi.endpoints.getConnections.initiate(undefined, { forceRefetch: true }));
        } catch (err) {
          console.error('Failed to disconnect:', err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useLazyGetConnectionsQuery,
  useDisconnectIntegrationMutation,
} = userApi;
