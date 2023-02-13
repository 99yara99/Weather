import { createSlice } from '@reduxjs/toolkit';
import { loadWeather } from './weatherApiHandlers';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherFromAPI: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [loadWeather.pending]: (state) => {
      state.isLoading = true;
    },
    [loadWeather.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.weatherFromAPI = action.payload;
    },
    [loadWeather.rejected]: (state, action) => {
      state.isLoading = false;
      state.weatherFromAPI = null;
      state.errorMessage = action.payload;
    },
  },
});

export default weatherSlice.reducer;
