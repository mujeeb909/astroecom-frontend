import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Add feature slices here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
