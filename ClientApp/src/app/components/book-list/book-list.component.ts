import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookSearch } from 'src/app/models/book-search.model';
import { selectBooks } from 'src/app/store/books.selectors';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  @Input() books: BookSearch[] | null = null;
}
