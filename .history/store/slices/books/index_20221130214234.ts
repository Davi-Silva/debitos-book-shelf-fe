import { createSlice } from '@reduxjs/toolkit'
import { BusinessPartnersState } from './types'

import { getBusinessPartners } from './thunks'

const initialState: BusinessPartnersState = {
  data: [],
  status: 'idle',
  errors: [],
}

export const businessPartnersSlice = createSlice({
  name: 'business_partners',
  initialState,
  reducers: {
    setBusinessPartners: (state, { payload }) => {
      state.data = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBusinessPartners.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getBusinessPartners.fulfilled, (state, { payload }) => {
      state.status = 'succeeded'
      state.data = payload.data
    })
    builder.addCase(getBusinessPartners.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const { setBusinessPartners } = businessPartnersSlice.actions

export * from './thunks'

export default businessPartnersSlice.reducer
