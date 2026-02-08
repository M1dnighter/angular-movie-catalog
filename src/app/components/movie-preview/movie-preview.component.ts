import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IMovie } from '../../services/movie.service';
import { RatingColorPipe } from '../../shared/rating-color.pipe';

@Component({
  selector: 'app-movie-preview',
  standalone: true,
  imports: [CommonModule, RatingColorPipe],
  templateUrl: './movie-preview.component.html',
  styleUrl: './movie-preview.component.scss'
})
export class MoviePreviewComponent implements AfterViewInit, OnChanges{
  @ViewChild('previewEl') previewRef!: ElementRef<HTMLDivElement>;

  @Input() movie: IMovie | null = null;
  @Input() visible: boolean = false;
  @Input() x: number = 0;
  @Input() y: number = 0;

  ngAfterViewInit() {
    if (this.visible) {
      this.updatePosition();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && (changes['x'] || changes['y'] || changes['movie'])) {
      setTimeout(() => this.updatePosition());
    }
  }

  updatePosition() {
    if (!this.previewRef) return;

    const preview = this.previewRef.nativeElement;
    const rect = this.previewRef.nativeElement.getBoundingClientRect();
    const offset = 15;

    let x = this.x + offset;
    let y = this.y + offset;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (x + rect.width > screenWidth){
        x = this.x - rect.width - offset;
    }

    if (y + rect.height > screenHeight){
        y = this.y - rect.height - offset;
    }

    preview.style.left = x + 'px';
    preview.style.top = y + 'px';
  }
}

