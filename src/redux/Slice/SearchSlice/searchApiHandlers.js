import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export let loadCoord = createAsyncThunk(
  'search/loadCoord',
  async (city, { rejectWithValue }) => {
    const myAPIKey = 'c672f02723facd37006c42e83485322d';

    try {
      const responseCoord = await axios.get(
        'http://api.openweathermap.org/geo/1.0/direct?',
        {
          params: {
            q: city,
            limit: 5,
            appid: myAPIKey,
          },
        }
      );
      if (responseCoord.statusText !== 'OK') {
        throw new Error('Server error');
      }
      console.log(responseCoord.data);
      return {
        allCities: responseCoord.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
