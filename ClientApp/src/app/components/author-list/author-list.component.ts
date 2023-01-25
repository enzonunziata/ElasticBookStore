import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/services/shared.service';
import { selectAuthors } from 'src/app/store/books.selectors';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent {
  constructor(private store: Store, private sharedService: SharedService) {}

  authors$ = this.store.select(selectAuthors);

  setAuthor(key: string): void {
    this.sharedService.setSearchAuthor(key);
  }
}
