import { BookSearch } from './book-search.model';
import { Bucket } from './bucket.model';
import { Paginated } from './paginated.model';

export interface SearchResult {
  query: string | null;
  author: string | null;
  category: string | null;
  books: Paginated<BookSearch>;
  authors: Bucket[];
  categories: Bucket[];
}
