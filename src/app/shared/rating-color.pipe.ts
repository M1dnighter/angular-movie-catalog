import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingColor',
  standalone: true
})
export class RatingColorPipe implements PipeTransform {

  transform(rating: number | null | undefined): string {
    if (!rating) return 'rating--none';

    if (rating >= 8) return 'rating--good';
    if (rating >= 5) return 'rating--medium';
    return 'rating--bad';
  }

}
