import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  return {};
});
