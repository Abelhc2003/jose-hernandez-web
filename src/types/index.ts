export type BookCategory = "trilogia" | "poesia" | "narrativa";

export type TrilogiaNumber = 1 | 2 | 3;

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  category: BookCategory;
  trilogiaNum?: TrilogiaNumber;
  amazonUrl: string;
  price?: string;
  synopsis: string;
  quote: string;
  coverImage: string;
  coverImageBack?: string;
  hook: string;
}

export interface Review {
  author: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  bookSlug?: string;
}
