import { configureStore } from '@reduxjs/toolkit';

import authors from './slices/books';
import books from './slices/authors';

export const store = configureStore({
  reducer: {
    authors,
    books,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export * from './hooks';
