import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINTS } from './apiEndpoints';

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
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
} = userApi;
