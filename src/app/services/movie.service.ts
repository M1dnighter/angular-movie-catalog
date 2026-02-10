import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { movieToSlug } from '../shared/slug.util';

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

  readonly movies = signal<IMovie[]>([]);
  readonly load = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  loadMovies() {
    this.load.set(true);
    this.error.set(null);

    this.http.get<IMovie[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.movies.set(data);
        this.load.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.load.set(false);
      }
    });
  }

  getMovieBySlug(slug: string): IMovie | undefined {
    return this.movies().find(m => movieToSlug(m) === slug);
  }
}
