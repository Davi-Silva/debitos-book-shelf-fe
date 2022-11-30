export type BusinessPartnersState = {
  data: {
    business_partner_ID: number
    name: string
    active: boolean
  }[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  errors: string[]
}
