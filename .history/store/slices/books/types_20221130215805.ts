export type Book = {
  id: number;
  name: string;
  country: string;
};

export type BooksState = {
  data: Book[];
  filtered: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
  author: Book | object;
};
