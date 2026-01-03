import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import userReducer from '../features/user/userSlice';
import { conversationsApi } from '../services/conversationsApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(userApi.middleware)
      .concat(conversationsApi.middleware),
});

export default store;
