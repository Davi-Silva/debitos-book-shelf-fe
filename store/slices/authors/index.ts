import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorsState } from './types';

import { getAuthors } from './thunks';

const initialState: AuthorsState = {
  data: [],
  filtered: [],
  status: 'idle',
  errors: [],
  author: {},
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthor: (state, { payload }) => {
      state.data = payload;
    },
    filterAuthor: (state, { payload }: PayloadAction<string>) => {
      const filtered = state.data.filter((author) =>
        author.name.toLowerCase().includes(payload)
      );
      state.filtered = filtered;
    },
    sortAuthors: (
      state,
      {
        payload,
      }: PayloadAction<{
        sortDirection: boolean;
        field: 'country' | 'id' | 'name';
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
    builder.addCase(getAuthors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAuthors.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload.data.results;
      state.filtered = payload.data.results;
    });
    builder.addCase(getAuthors.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setAuthor, filterAuthor, sortAuthors } = authorsSlice.actions;

export * from './thunks';

export default authorsSlice.reducer;
