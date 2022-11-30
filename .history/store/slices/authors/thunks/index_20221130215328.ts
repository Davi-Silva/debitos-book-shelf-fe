import { createAsyncThunk } from '@reduxjs/toolkit';

import {} from '../../../../constants/envs';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  const response = await fetch(`${process.env.BOOK_SHELF_API_ENDPOINT}]`);

  return {};
});
