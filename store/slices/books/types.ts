export type Book = {
  id: number;
  author_id: number;
  name: string;
  isbn_no: string;
};

export type BooksState = {
  data: Book[];
  filtered: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
  book: Book | object;
};
