import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, input, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IMovie } from '../../services/movie.service';
import { RatingColorPipe } from '../../shared/rating-color.pipe';

@Component({
  selector: 'app-movie-preview',
  standalone: true,
  imports: [CommonModule, RatingColorPipe],
  templateUrl: './movie-preview.component.html',
  styleUrl: './movie-preview.component.scss'
})
export class MoviePreviewComponent {
  @ViewChild('previewEl') previewRef!: ElementRef<HTMLDivElement>;

  movie = input.required<IMovie>();
  x = input.required<number>();
  y = input.required<number>();

  constructor() {
    effect(() => {
      this.movie();
      this.x();
      this.y();
      requestAnimationFrame(() => this.updatePosition());
    })
  }

  ngAfterViewInit() {
    this.updatePosition();
  }

  updatePosition() {
    if (!this.previewRef) return;

    const preview = this.previewRef.nativeElement;
    const rect = this.previewRef.nativeElement.getBoundingClientRect();
    const offset = 15;

    let x = this.x() + offset;
    let y = this.y() + offset;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (x + rect.width > screenWidth){
        x = this.x() - rect.width - offset;
    }

    if (y + rect.height > screenHeight){
        y = this.y() - rect.height - offset;
    }

    preview.style.left = x + 'px';
    preview.style.top = y + 'px';
  }
}

