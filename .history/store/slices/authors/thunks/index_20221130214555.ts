import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkAPIUrlEnv } from '../../../../utils/checkAPIUrlEnv';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  return {};
});
