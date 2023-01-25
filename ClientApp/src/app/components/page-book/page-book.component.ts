import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BooksActions } from 'src/app/store/books.actions';
import { selectBook } from 'src/app/store/books.selectors';

@Component({
  selector: 'app-page-book',
  templateUrl: './page-book.component.html',
  styleUrls: ['./page-book.component.scss'],
})
export class PageBookComponent implements OnInit {
  isbn13: string = '';
  book$ = this.store.select(selectBook);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        this.isbn13 = params.get('isbn13') || '';
        this.store.dispatch(BooksActions.getBook({ isbn13: this.isbn13 }));
      })
      .unsubscribe();
  }
}
