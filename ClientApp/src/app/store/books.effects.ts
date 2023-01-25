import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { BooksActions, BooksApiActions } from './books.actions';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  getBookInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBook),
      switchMap(({ isbn13 }) => of(BooksApiActions.retrievingBook({ isbn13 })))
    )
  );

  getBookResetSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBook),
      switchMap(() => of(BooksActions.resetSuggestions()))
    )
  );

  getBookComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksApiActions.retrievingBook),
      switchMap(({ isbn13 }) =>
        this.apiService
          .getBook(isbn13)
          .pipe(map((book) => BooksApiActions.retrievedBook({ book })))
      )
    )
  );

  searchBooksResetSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      switchMap(() => of(BooksActions.resetSuggestions()))
    )
  );

  searchBooksInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      switchMap(({ page, query, author, category }) => {
        return of(
          BooksApiActions.retrievingSearchResult({
            page,
            query,
            author,
            category,
          })
        );
      })
    )
  );

  searchBooksComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksApiActions.retrievingSearchResult),
      switchMap(({ page, query, author, category }) =>
        this.apiService
          .search(page, query, author, category)
          .pipe(
            map((result) => BooksApiActions.retrievedSearchResult({ result }))
          )
      )
    )
  );

  suggestionsInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getSuggestions),
      switchMap(({ term }) => {
        if (term) {
          return of(BooksApiActions.retrievingSuggestions({ term }));
        } else {
          return of(BooksActions.resetSuggestions());
        }
      })
    )
  );

  suggestionsComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksApiActions.retrievingSuggestions),
      switchMap(({ term }) => {
        return this.apiService
          .getSuggestions(term)
          .pipe(
            map((result) =>
              BooksApiActions.retrievedSuggestions({ suggestions: result })
            )
          );
      })
    )
  );
}
