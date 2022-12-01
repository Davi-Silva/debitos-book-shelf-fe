import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    filterBook: (state, { payload }: PayloadAction<string>) => {
      const filtered = state.data.filter((book) =>
        book.name.toLowerCase().includes(payload)
      );
      state.filtered = filtered;
    },
    sortBooks: (
      state,
      {
        payload,
      }: PayloadAction<{
        sortDirection: boolean;
        field: 'name';
      }>
    ) => {
      const sorted = state.filtered.sort((a, b) => {
        const textA = a[payload.field] as string;
        const textB = b[payload.field] as string;
        const aLower = textA.toUpperCase();
        const bLower = textB.toUpperCase();

        return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
      });
      console.log({ sorted });

      if (payload.sortDirection) {
        state.filtered = sorted;
      } else {
        state.filtered = sorted.reverse();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload.data.results;
      state.filtered = payload.data.results;
    });
    builder.addCase(getBooks.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setBooks, filterBook, sortBooks } = booksSlices.actions;

export * from './thunks';

export default booksSlices.reducer;
