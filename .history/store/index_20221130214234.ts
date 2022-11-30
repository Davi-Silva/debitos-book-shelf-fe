import { configureStore } from '@reduxjs/toolkit'

import events from './slices/bp_events'

import masterData from './slices/master_data'

import businessPartners from './slices/business_partners'

import navbar from './slices/navbar'
import user from './slices/user'
import tacticalForecastPremises from './slices/tactialForecastPremises'
import relevantQueues from './slices/relevantQueues'

export const store = configureStore({
  reducer: {
    navbar,
    user,
    tacticalForecastPremises,
    events,
    businessPartners,
    masterData,
    relevantQueues,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export * from './hooks'
