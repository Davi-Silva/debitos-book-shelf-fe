import { TableEventsType } from '../../../Pages/PartnerManagement/Pages/Events/types'

export type EventsState = {
  data: TableEventsType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  errors: string[]
  filterDates: {
    startDate: string
    endDate: string
  }
}
