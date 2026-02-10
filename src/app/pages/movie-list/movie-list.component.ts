import { CommonModule } from '@angular/common';

import { Component, OnInit, ElementRef, ViewChild, signal, computed, inject } from '@angular/core';
import { IMovie, MovieService } from '../../services/movie.service';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MoviePreviewComponent } from '../../components/movie-preview/movie-preview.component';
import { map, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { movieToSlug } from '../../shared/slug.util';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MovieCardComponent, SearchBarComponent, MoviePreviewComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  private movieService = inject(MovieService);

  @ViewChild(MoviePreviewComponent)
  previewComp?: MoviePreviewComponent;

  movies = this.movieService.movies;
  load = this.movieService.load;
  error = this.movieService.error;
  searchTerm = signal('');

  // isPreviewVisible = computed(() => !!this.previewMovie());
  previewMovie = signal<IMovie | null>(null);
  previewX = signal(0);
  previewY = signal(0);

  // private hover$ = new Subject<{ event: MouseEvent; movie: IMovie}>();
  private hover$ = new Subject<IMovie>();
  private leave$ = new Subject<void>();
  private lastMouseEvent!: MouseEvent;

  filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const movies = this.movies();

    if (!term) return movies;
    return movies.filter(movie => 
      movie.name.toLowerCase().includes(term)
    );
  });

  movieToSlug = movieToSlug;
  
  constructor(){
    this.movieService.loadMovies();

    this.hover$
    .pipe(
      switchMap(movie =>
        timer(150).pipe(
          takeUntil(this.leave$),
          map(() => movie)
        )
      )
    )
    .subscribe(movie => {
      this.previewMovie.set(movie);
      this.previewX.set(this.lastMouseEvent.clientX);
      this.previewY.set(this.lastMouseEvent.clientY);
    });
  }
  
  onMouseHover(event: MouseEvent, movie: IMovie){
    if (this.previewMovie()) return;
    this.lastMouseEvent = event;
    this.hover$.next(movie);
  }   

  hidePreview() {
    this.leave$.next();
    this.previewMovie.set(null);
  }

}



