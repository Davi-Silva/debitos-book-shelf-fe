import { createAsyncThunk } from '@reduxjs/toolkit';

import { BOOK_SHELF_API_ENDPOINT } from '../../../../constants/envs';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  const response = await fetch(`${BOOK_SHELF_API_ENDPOINT}/books`);

  console.log(response);

  return {};
});
