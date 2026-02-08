import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface IMovie {
  "id": number;
  "name": string;
  "description": string;
  "year": number;
  "rating": number;
  "ganre": string[];
  "image": string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) { }

  getMovie(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Ошибка при загрузке фильмов', err);
        return throwError(() => new Error('Ошибка при загрузке фильмов'));
      })
    );
  }

  getMovieById(id: number): Observable<IMovie>{
    return this.http.get<IMovie>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Ошибка при загрузке фильма', err);
        return throwError(() => new Error('Ошибка при загрузке фильма'));
      })
    );
  }
}
