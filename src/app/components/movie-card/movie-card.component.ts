import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMovie } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: IMovie;

  @Output() hoverMovie = new EventEmitter<{ event: MouseEvent; movie: IMovie}>();
  @Output() leaveMovie = new EventEmitter<void>();

  onMouseMove(event: MouseEvent) {
    this.hoverMovie.emit({ event, movie: this.movie });
  }

  onMouseLeave() {
    this.leaveMovie.emit();
  }

  getSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-а-яё]/gi, '');
  }
}
