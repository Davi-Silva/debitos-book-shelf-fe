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
    setBooks: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload.data;
    });
    builder.addCase(getBooks.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setBooks } = booksSlices.actions;

export * from './thunks';

export default booksSlices.reducer;
