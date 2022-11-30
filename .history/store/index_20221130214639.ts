import { configureStore } from '@reduxjs/toolkit';

import events from './slices/authors';

import masterData from './slices/master_data';

import businessPartners from './slices/books';

import navbar from './slices/navbar';
import user from './slices/user';
import tacticalForecastPremises from './slices/tactialForecastPremises';
import relevantQueues from './slices/relevantQueues';

export const store = configureStore({
  reducer: {
    events,
    businessPartners,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export * from './hooks';
