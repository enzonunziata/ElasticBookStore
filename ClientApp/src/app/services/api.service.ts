import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { SearchResult } from '../models/search-result.model';
import { Suggestion } from '../models/suggestion.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBook(isbn13: string): Observable<Book> {
    return this.http.get<Book>(`/api/books/${isbn13}`);
  }

  getSuggestions(term: string): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(
      `/api/books/suggest/${encodeURIComponent(term)}`
    );
  }

  search(
    page: number,
    query: string,
    author: string,
    category: string
  ): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `/api/books/search?p=${page}&q=${encodeURIComponent(
        query
      )}&a=${encodeURIComponent(author)}&c=${encodeURIComponent(category)}`
    );
  }
}
