import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../models/book.model';
import { SearchResult } from '../models/search-result.model';
import { Suggestion } from '../models/suggestion.model';
import { ModelState } from './model-state';

export const selectBook = createSelector(
  createFeatureSelector<ModelState<Book>>('book'),
  (state: ModelState<Book>) => state.model
);

export const selectSuggestions = createSelector(
  createFeatureSelector<ModelState<Suggestion[]>>('suggestions'),
  (state: ModelState<Suggestion[]>) => state.model
);

export const selectSearchResult =
  createFeatureSelector<ModelState<SearchResult>>('search');

export const selectBooks = createSelector(
  selectSearchResult,
  (state: ModelState<SearchResult>) =>
    state.model ? state.model.books.items : []
);

export const selectPagination = createSelector(
  selectSearchResult,
  (state: ModelState<SearchResult>) =>
    state.model
      ? {
          page: state.model.books.currentPage,
          itemsPerPage: state.model.books.itemsPerPage,
          totalItems: state.model.books.totalItems,
          totalPages: state.model.books.totalPages,
          query: state.model.query,
          author: state.model.author,
          category: state.model.category,
        }
      : null
);

export const selectAuthors = createSelector(
  selectSearchResult,
  (state: ModelState<SearchResult>) =>
    state.model
      ? { authors: state.model.authors, selected: state.model.author }
      : { authors: [], selected: '' }
);

export const selectCategories = createSelector(
  selectSearchResult,
  (state: ModelState<SearchResult>) =>
    state.model
      ? { categories: state.model.categories, selected: state.model.category }
      : { categories: [], selected: '' }
);
