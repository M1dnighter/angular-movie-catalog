import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMovie, MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RatingColorPipe } from '../../shared/rating-color.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingColorPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {

  movie: IMovie | null = null;
  load: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ){}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.movieService.getMovie().subscribe({
        next: (movies) => {
          this.movie = movies.find(m => this.getSlug(m) === slug) || null;
          this.load = false;
        },
        error: (err) => {
          this.error = err.message;
          this.load = false;
        }
      });
    } else{
      this.load = false;
      this.error = 'Фильм не найден';
    }
  }

  getSlug(movie: IMovie): string {
    return movie.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9а-яё-]/gi, '');
  }
}
