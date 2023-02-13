import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export let loadWeather = createAsyncThunk(
  'weather/loadWeather',
  async ({ coord }, { rejectWithValue }) => {
    const myAPIKey = 'c672f02723facd37006c42e83485322d';

    try {
      const responseCurrent = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: coord.lat,
            lon: coord.lon,
            appid: myAPIKey,
            units: 'metric',
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
            units: 'metric',
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
      console.log(responseForecast.data);
      return {
        currentWeather: responseCurrent.data,
        forecastWeather: responseForecast.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
