import { createReducer, on } from '@ngrx/store';
import { SearchResult } from '../models/search-result.model';
import { BooksActions, BooksApiActions } from './books.actions';
import { ModelState } from './model-state';

export const initialState: ModelState<SearchResult | null> = {
  model: null,
  isLoaded: false,
  isLoading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievingSearchResult, (_state, {}) => ({
    ..._state,
    isLoaded: false,
    isLoading: true,
  })),
  on(BooksApiActions.retrievedSearchResult, (_state, { result }) => ({
    ..._state,
    model: result,
    isLoaded: true,
    isLoading: false,
  }))
);
