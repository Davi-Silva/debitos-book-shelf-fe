export type Author = {
  id: number;
  name: string;
  country: string;
};

export type AuthorsState = {
  data: Author[];
  filtered: AUthorp[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string[];
};
