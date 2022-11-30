export type Author = {
  id: number;
  name: string;
  country: string;
};

export type AuthorsState = {
  data: Author[];
  filtered: Author[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
  author: Author | object;
};
