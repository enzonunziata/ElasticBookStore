import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() pagination: {
    page: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    query: string | null;
    author: string | null;
    category: string | null;
  } | null = null;

  constructor(private sharedService: SharedService) {}

  nextPage(): void {
    this.sharedService.searchNextPage();
  }

  prevPage(): void {
    this.sharedService.searchPrevPage();
  }
}
