import { createAsyncThunk } from '@reduxjs/toolkit';

import { BOOK_SHELF_API_ENDPOINT } from '../../../../constants/envs';

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await fetch(`${BOOK_SHELF_API_ENDPOINT}/books`);
  const data = await response.json();

  return { data };
});
