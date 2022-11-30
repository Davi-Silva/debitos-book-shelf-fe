import { createAsyncThunk } from '@reduxjs/toolkit'
import { checkAPIUrlEnv } from '../../../../utils/checkAPIUrlEnv'

export const getEvents = createAsyncThunk(
  'bp_events/getEvents',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
    const isDateRange = startDate && endDate
    const url = isDateRange
      ? `business-partners-segment-events?startDate=${startDate}&endDate=${endDate}`
      : 'business-partners-segment-events'
    const response = await fetch(`${checkAPIUrlEnv}/${url}`)
    const data = await response.json()

    if (!response.ok) {
      return Promise.reject(data)
    }

    return { data: data.result }
  }
)
