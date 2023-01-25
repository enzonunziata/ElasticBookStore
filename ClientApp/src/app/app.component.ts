import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksActions } from './store/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      BooksActions.searchBooks({
        page: 1,
        query: '',
        author: '',
        category: '',
      })
    );
  }
}
