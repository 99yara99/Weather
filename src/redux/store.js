import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
