import { createAsyncThunk } from '@reduxjs/toolkit'
import { checkAPIUrlEnv } from '../../../../utils/checkAPIUrlEnv'

export const getBusinessPartners = createAsyncThunk(
  'bp_events/getPartners',
  async () => {
    const response = await fetch(`${checkAPIUrlEnv}/business-partners`)
    const data = await response.json()

    if (!response.ok) {
      return Promise.reject(data)
    }

    return { data: data.result }
  }
)
