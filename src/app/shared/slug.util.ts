import { IMovie } from '../services/movie.service';

export function movieToSlug(movie: IMovie): string {
  return movie.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9а-яё-]/gi, '');
}
