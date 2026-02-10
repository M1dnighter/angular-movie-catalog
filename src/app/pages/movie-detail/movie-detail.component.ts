import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { IMovie, MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RatingColorPipe } from '../../shared/rating-color.pipe';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingColorPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  private slug = toSignal(this.route.paramMap, {initialValue: null});

  movie = computed(() => {
    const slug = this.slug()?.get('slug');
    if (!slug) return null;
    return this.movieService.getMovieBySlug(slug);
  });
}
