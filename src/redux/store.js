import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Slice/WeatherSlice/weathersSlice';
import searchReducer from './Slice/SearchSlice/searchSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    search: searchReducer,
  },
});
