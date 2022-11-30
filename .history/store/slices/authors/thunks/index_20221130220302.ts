import { createAsyncThunk } from '@reduxjs/toolkit';

import { BOOK_SHELF_API_ENDPOINT } from '../../../../constants/envs';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  const response = await fetch(`${BOOK_SHELF_API_ENDPOINT}/authors`);
  const data = await response.json();

  return {};
});
