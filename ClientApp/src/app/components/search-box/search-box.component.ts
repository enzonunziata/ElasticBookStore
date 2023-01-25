import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Suggestion } from 'src/app/models/suggestion.model';
import { SharedService } from 'src/app/services/shared.service';
import { BooksActions } from 'src/app/store/books.actions';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
  searchTermChanges = new Subject<string>();
  @Input() term: string = '';

  constructor(private store: Store, private sharedService: SharedService) {}

  @Input() suggestions: Suggestion[] | null = null;

  suggest(e: KeyboardEvent): void {
    if (e.code == 'Enter') {
      this.sharedService.setSearchQuery(this.term);
    } else {
      this.searchTermChanges.next(this.term);
    }
  }

  setQuery(term: string): void {
    this.term = term;
    this.sharedService.setSearchQuery(term);
  }

  setAuthor(author: string): void {
    this.term = '';
    this.sharedService.setSearchAuthor(author);
  }

  ngOnInit(): void {
    this.subscription = this.searchTermChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        this.store.dispatch(BooksActions.getSuggestions({ term: res }));
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
