import { createReducer, on } from '@ngrx/store';
import { Suggestion } from '../models/suggestion.model';
import { BooksActions, BooksApiActions } from './books.actions';
import { ModelState } from './model-state';

export const initialState: ModelState<Suggestion[]> = {
  model: [],
  isLoaded: false,
  isLoading: false,
};

export const suggestionsReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievingSuggestions, (_state, {}) => ({
    ..._state,
    isLoaded: false,
    isLoading: true,
  })),
  on(BooksApiActions.retrievedSuggestions, (_state, { suggestions }) => ({
    ..._state,
    model: suggestions,
    isLoaded: true,
    isLoading: false,
  })),
  on(BooksActions.resetSuggestions, (_state, {}) => ({
    ..._state,
    model: [],
    isLoading: false,
    isLoaded: false,
  }))
);
