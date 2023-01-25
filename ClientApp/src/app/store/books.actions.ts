import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models/book.model';
import { SearchResult } from '../models/search-result.model';
import { Suggestion } from '../models/suggestion.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Get Book': props<{ isbn13: string }>(),
    'Get Suggestions': props<{ term: string }>(),
    'Reset Suggestions': emptyProps(),
    'Search Books': props<{
      page: number;
      query: string;
      author: string;
      category: string;
    }>(),
    'Next Page': emptyProps(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Retrieving Book': props<{ isbn13: string }>(),
    'Retrieved Book': props<{ book: Book | null }>(),
    'Retrieving Suggestions': props<{ term: string }>(),
    'Retrieved Suggestions': props<{ suggestions: Suggestion[] }>(),
    'Retrieving Search Result': props<{
      page: number;
      query: string;
      author: string;
      category: string;
    }>(),
    'Retrieved Search Result': props<{ result: SearchResult }>(),
  },
});
