import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Slice/weathersSlice';
import searchReducer from './Slice/searchSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    search: searchReducer,
  },
});
