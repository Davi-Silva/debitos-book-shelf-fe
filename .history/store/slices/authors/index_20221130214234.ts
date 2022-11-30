import { createSlice } from '@reduxjs/toolkit'
import { EventsState } from './types'

import { getEvents } from './thunks'

const initialState: EventsState = {
  data: [],
  status: 'idle',
  errors: [],
  filterDates: {
    startDate: '',
    endDate: '',
  },
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, { payload }) => {
      state.data = payload
    },
    setDates: (state, { payload }) => {
      state.filterDates = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      state.status = 'succeeded'
      state.data = payload.data
    })
    builder.addCase(getEvents.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const { setEvents, setDates } = eventsSlice.actions

export * from './thunks'

export default eventsSlice.reducer
