export interface Book {
  title: string;
  subtitle: string;
  description: string;
  authors: string[];
  categories: string[];
  thumbnail: string;
  isbn13: string;
  isbn10: string;
  publishedYear: number;
  averageRating: number;
  numPages: number;
  ratingsCount: number;
}
