import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/services/shared.service';
import { selectCategories } from 'src/app/store/books.selectors';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  constructor(private store: Store, private sharedService: SharedService) {}

  categories$ = this.store.select(selectCategories);

  setCategory(key: string): void {
    this.sharedService.setSearchCategory(key);
  }
}
