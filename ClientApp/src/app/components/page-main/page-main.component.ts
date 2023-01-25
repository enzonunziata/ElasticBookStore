import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBooks,
  selectPagination,
  selectSuggestions,
} from 'src/app/store/books.selectors';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class PageMainComponent {
  constructor(private store: Store) {}

  books$ = this.store.select(selectBooks);
  pagination$ = this.store.select(selectPagination);
  suggestions$ = this.store.select(selectSuggestions);
}
