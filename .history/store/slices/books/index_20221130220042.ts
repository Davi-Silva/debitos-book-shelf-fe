import { createSlice } from '@reduxjs/toolkit';
import { BooksState } from './types';

import { getBooks } from './thunks';

const initialState: BooksState = {
  data: [],
  filtered: [],
  status: 'idle',
  errors: [],
  book: {},
};

export const booksSlices = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAuthor: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
    });
    builder.addCase(getBooks.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setAuthor } = booksSlices.actions;

export * from './thunks';

export default booksSlices.reducer;
