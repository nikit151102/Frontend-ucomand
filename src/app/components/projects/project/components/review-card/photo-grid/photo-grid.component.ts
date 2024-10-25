import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-grid.component.html',
  styleUrl: './photo-grid.component.css'
})
export class PhotoGridComponent {
  @Input() photos: { url: string }[] = [];
  maxPhotos = 3;

  getPhotoGridClass(): string {
    const count = Math.min(this.photos.length, this.maxPhotos);
    return count === 1 ? 'one-photo' : count === 2 ? 'two-photos' : 'three-photos';
  }
}
