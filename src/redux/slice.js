import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  weatherFromAPI: null,
  isLoading: false,
  errorMessage: null,
};

export let loadWeather = createAsyncThunk(
  'weather/loadWeather',
  async ({ coord, unitTemp }, { rejectWithValue }) => {
    const myAPIKey = 'c672f02723facd37006c42e83485322d';

    try {
      const responseCurrent = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: coord.lat,
            lon: coord.lon,
            appid: myAPIKey,
            units: unitTemp,
          },
        }
      );

      const responseForecast = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast?',
        {
          params: {
            lat: coord.lat,
            lon: coord.lon,
            appid: myAPIKey,
            units: unitTemp,
            cnt: 7,
          },
        }
      );

      if (responseForecast.statusText !== 'OK') {
        throw new Error('Server error');
      }

      if (responseCurrent.statusText !== 'OK') {
        throw new Error('Server error');
      }

      return {
        currentWeather: responseCurrent.data,
        forecastWeather: responseForecast.data,
      };
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

export default weatherSlice.reducer;
