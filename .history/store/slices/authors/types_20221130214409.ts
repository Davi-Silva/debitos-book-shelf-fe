import { TableEventsType } from '../../../Pages/PartnerManagement/Pages/Events/types';

export type Book = {
  id: number;
  author_id: number;
  name: string;
  isbn_no: string;
};

export type Author = {
  id: number;
  name: string;
  country: string;
};

export type BooksState = {
  data: TableEventsType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
  filterDates: {
    startDate: string;
    endDate: string;
  };
};
