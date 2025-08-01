import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 