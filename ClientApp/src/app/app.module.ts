import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { PageMainComponent } from './components/page-main/page-main.component';
import { PageBookComponent } from './components/page-book/page-book.component';
import { bookReducer } from './store/book.reducer';
import { suggestionsReducer } from './store/suggestions.reducer';
import { searchReducer } from './store/search.reducer';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/books.effects';
import { FormsModule } from '@angular/forms';
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    CategoryListComponent,
    BookListComponent,
    SearchBoxComponent,
    BookDetailComponent,
    PageMainComponent,
    PageBookComponent,
    PaginatorComponent,
    StarsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([BooksEffects]),
    StoreModule.forRoot(
      {
        book: bookReducer,
        suggestions: suggestionsReducer,
        search: searchReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
