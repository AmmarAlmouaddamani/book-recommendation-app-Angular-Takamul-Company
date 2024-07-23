import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // رابط API للبحث عن الكتب
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) { }

  // دالة للبحث عن الكتب
  GetBooks(query: string = 'the lord of the rings', page: number = 1): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}&page=${page}`).pipe(
      map((response: any) => response.docs.map((book: any) => ({
        key: book.key,
        title: book.title,
        // author: book.author_name ? book.author_name[0] : 'Unknown Author'
      }))),
      tap(resulte => console.log(resulte))
    );
  }
}
