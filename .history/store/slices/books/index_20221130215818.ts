import { createSlice } from '@reduxjs/toolkit';
import { BooksState } from './types';

import { getAuthors } from './thunks';

const initialState: AuthorsState = {
  data: [],
  filtered: [],
  status: 'idle',
  errors: [],
  author: {},
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setAuthor: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAuthors.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
    });
    builder.addCase(getAuthors.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setAuthor } = eventsSlice.actions;

export * from './thunks';

export default eventsSlice.reducer;
