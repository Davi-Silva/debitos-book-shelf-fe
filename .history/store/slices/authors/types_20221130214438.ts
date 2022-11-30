import { TableEventsType } from '../../../Pages/PartnerManagement/Pages/Events/types';

export type Author = {
  id: number;
  name: string;
  country: string;
};

export type AuthorsState = {
  data: Author[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
};
