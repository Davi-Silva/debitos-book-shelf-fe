import { configureStore } from '@reduxjs/toolkit';

import books from './slices/authors';
import authors from './slices/books';

export const store = configureStore({
  reducer: {
    authors,
    books,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export * from './hooks';
