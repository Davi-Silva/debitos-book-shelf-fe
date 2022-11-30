import { createSlice } from '@reduxjs/toolkit';
import { AuthorsState } from './types';

import { getAuthors } from './thunks';

const initialState: AuthorsState = {
  data: [],
  filtered: [],
  status: 'idle',
  errors: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, { payload }) => {
      state.data = payload;
    },
    setDates: (state, { payload }) => {
      state.filterDates = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAuthors.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload.data;
    });
    builder.addCase(getAuthors.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setEvents, setDates } = eventsSlice.actions;

export * from './thunks';

export default eventsSlice.reducer;
