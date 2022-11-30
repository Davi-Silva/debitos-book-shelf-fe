import { createSlice } from '@reduxjs/toolkit';
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

export const { setAuthor } = authorsSlice.actions;

export * from './thunks';

export default authorsSlice.reducer;
