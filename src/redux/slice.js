import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  weatherFromAPI: null,
  isLoading: false,
  errorMessage: null,
};

export let loadWeather = createAsyncThunk(
  'weather/loadWeather',
  async (_, { rejectWithValue }) => {
    const myAPIKey = 'c672f02723facd37006c42e83485322d';
    const celsius = 'metric';
    const KyivCoordinates = {
      lat: 50.4500336,
      lon: 30.5241361,
    };

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: KyivCoordinates.lat,
            lon: KyivCoordinates.lon,
            appid: myAPIKey,
            units: celsius,
          },
        }
      );

      if (response.statusText !== 'OK') {
        throw new Error('Server error');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
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

// export const { weatherLoadStart, weatherLoadSuccess, weatherLoadError } =
//   weatherSlice.actions;

export default weatherSlice.reducer;
