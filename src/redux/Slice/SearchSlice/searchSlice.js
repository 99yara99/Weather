import { createSlice } from '@reduxjs/toolkit';
import { loadCoord } from './searchApiHandlers';

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
