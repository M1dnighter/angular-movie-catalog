import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IMovie, MovieService } from '../../services/movie.service';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MoviePreviewComponent } from '../../components/movie-preview/movie-preview.component';



@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, MovieCardComponent, SearchBarComponent, MoviePreviewComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {

  movies: IMovie[] = [];
  load = true;
  error: string | null = null;
  searchTerm: string = '';

  isPreviewVisible: boolean = false;
  previewMovie: IMovie | null = null;
  previewX = 0;
  previewY = 0;

  private previewTimer: any;
  private lastMouseEvent!: MouseEvent;
  private pendingMovie: IMovie | null = null;

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movieService.getMovie().subscribe({
      next: (data) => {
        this.movies = data;
        this.load = false;
      },
      error: (err) => {
        this.error = err.message;
        this.load = false;
      }
    })
  }

  trackMouse(event: MouseEvent, movie: IMovie){
    if (this.isPreviewVisible) return;

    this.pendingMovie = movie;
    this.lastMouseEvent = event;

    clearTimeout(this.previewTimer);

    this.previewTimer = setTimeout(() =>{
      this.showPreview();
    }, 150)
  }

  showPreview(){
    if (!this.lastMouseEvent || !this.pendingMovie) return;

    this.previewMovie = this.pendingMovie;
    const offset = 15;


    this.previewX = this.lastMouseEvent.clientX + offset;
    this.previewY = this.lastMouseEvent.clientY + offset;

    this.isPreviewVisible = true;
  }    

  hidePreview() {
    clearTimeout(this.previewTimer);
    this.isPreviewVisible = false;
    this.previewMovie = null;
    this.pendingMovie = null;
  }

  filteredMovies(): IMovie[] {
    if(!this.searchTerm.trim()) return this.movies;

    const term = this.searchTerm.toLowerCase();
    return this.movies.filter(mov => mov.name.toLowerCase().includes(term));
  }

  getSlug(movie: IMovie): string {
    return movie.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-а-яё]/gi, '');
  }

  encodeName(name: string): string {
    return encodeURIComponent(name.toLowerCase());
  }

}


