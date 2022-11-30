import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

      return {
        allCities: responseCoord.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    coordFromAPI: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [loadCoord.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCoord.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.coordFromAPI = action.payload;
    },
    [loadCoord.rejected]: (state, action) => {
      state.isLoading = false;
      state.coordFromAPI = null;
      state.errorMessage = action.payload;
    },
  },
});

export default searchSlice.reducer;
