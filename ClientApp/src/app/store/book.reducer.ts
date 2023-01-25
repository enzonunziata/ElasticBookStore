import { createReducer, on } from '@ngrx/store';
import { Book } from '../models/book.model';
import { BooksApiActions } from './books.actions';
import { ModelState } from './model-state';

export const initialState: ModelState<Book | null> = {
  model: null,
  isLoaded: false,
  isLoading: false,
};

export const bookReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievingBook, (_state, {}) => ({
    ..._state,
    isLoaded: false,
    isLoading: true,
  })),
  on(BooksApiActions.retrievedBook, (_state, { book }) => ({
    ..._state,
    model: book,
    isLoaded: true,
    isLoading: false,
  }))
);
