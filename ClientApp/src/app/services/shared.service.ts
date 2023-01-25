import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BooksActions } from '../store/books.actions';
import { selectPagination } from '../store/books.selectors';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private store: Store) {}

  pagination$ = this.store.select(selectPagination);

  setSearchQuery(query: string): void {
    this.pagination$
      .pipe(take(1))
      .subscribe((res) => {
        if (res != null) {
          this.store.dispatch(
            BooksActions.searchBooks({
              page: 1,
              query: query,
              author: '',
              category: '',
            })
          );
        }
      })
      .unsubscribe();
  }

  setSearchAuthor(author: string): void {
    this.pagination$
      .pipe(take(1))
      .subscribe((res) => {
        if (res != null) {
          this.store.dispatch(
            BooksActions.searchBooks({
              page: 1,
              query: res.query || '',
              author: author,
              category: res.category || '',
            })
          );
        }
      })
      .unsubscribe();
  }

  setSearchCategory(category: string): void {
    this.pagination$
      .pipe(take(1))
      .subscribe((res) => {
        if (res != null) {
          this.store.dispatch(
            BooksActions.searchBooks({
              page: 1,
              query: res.query || '',
              author: res.author || '',
              category: category,
            })
          );
        }
      })
      .unsubscribe();
  }

  searchNextPage(): void {
    this.pagination$
      .pipe(take(1))
      .subscribe((res) => {
        if (res != null) {
          this.store.dispatch(
            BooksActions.searchBooks({
              page: res.page + 1,
              query: res.query || '',
              author: res.author || '',
              category: res.category || '',
            })
          );
        }
      })
      .unsubscribe();
  }

  searchPrevPage(): void {
    this.pagination$
      .pipe(take(1))
      .subscribe((res) => {
        if (res != null) {
          this.store.dispatch(
            BooksActions.searchBooks({
              page: res.page - 1,
              query: res.query || '',
              author: res.author || '',
              category: res.category || '',
            })
          );
        }
      })
      .unsubscribe();
  }
}
