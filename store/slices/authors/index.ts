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

export const { setAuthor, filterAuthor } = authorsSlice.actions;

export * from './thunks';

export default authorsSlice.reducer;
