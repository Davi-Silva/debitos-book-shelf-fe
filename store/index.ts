import { configureStore } from '@reduxjs/toolkit';

import authors from './slices/authors';
import books from './slices/books';

export const store = configureStore({
  reducer: {
    authors,
    books,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export * from './hooks';
