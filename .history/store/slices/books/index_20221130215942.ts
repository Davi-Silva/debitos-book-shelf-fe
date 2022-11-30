import { createSlice } from '@reduxjs/toolkit';
import { BooksState } from './types';

import { getAuthors } from './thunks';

const initialState: BooksState = {
  data: [],
  filtered: [],
  status: 'idle',
  errors: [],
  book: {},
};

export const booksSlices = createSlice({
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

export const { setAuthor } = booksSlices.actions;

export * from './thunks';

export default booksSlices.reducer;
