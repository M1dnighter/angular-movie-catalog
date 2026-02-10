import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMovie } from '../../services/movie.service';
import { movieToSlug } from '../../shared/slug.util';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  movie = input.required<IMovie>();

  @Output() hoverMovie = new EventEmitter<{ event: MouseEvent; movie: IMovie}>();
  @Output() leaveMovie = new EventEmitter<void>();

  movieToSlug = movieToSlug;

  onMouseMove(event: MouseEvent) {
    this.hoverMovie.emit({ event, movie: this.movie() });
  }

  onMouseLeave() {
    this.leaveMovie.emit();
  }
}
