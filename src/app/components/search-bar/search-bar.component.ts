import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  value = signal('');

  searchChange = output<string>();


  onInputChange() {
    this.searchChange.emit(this.value());
  }

}
