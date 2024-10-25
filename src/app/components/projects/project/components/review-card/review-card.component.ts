import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PhotoGridComponent } from './photo-grid/photo-grid.component';

interface itemCard {
  user: userCard;
  title: string;
  text: string;
}

interface userCard {
  lastName: string;
  firstName: string;
  imageLink: string;
  dateOfRegistration: string;
  nickname: string;
}

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, PhotoGridComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
  providers: [DatePipe]
})
export class ReviewCardComponent {

  @Input() Item!: itemCard
  @Input() visibleFoto: boolean = false;
  constructor(private datePipe: DatePipe) { }

  getFormattedDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd.MM.yyyy в HH.mm');
  }

  photoArray = [
    { url: 'https://avatars.mds.yandex.net/get-mpic/1985106/img_id2047960825122601198.jpeg/orig' },
  ]
}
