import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PhotoGridComponent } from './photo-grid/photo-grid.component';
import { ProjectService } from '../../project.service';
import { TapeService } from '../tape/tape.service';


@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, PhotoGridComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
  providers: [DatePipe]
})
export class ReviewCardComponent implements OnInit {

  @Input() Item!: any
  @Input() visibleFoto: boolean = false;
  isOwner: boolean = false;
  photoArray: { url: any; }[] = []

  constructor(private projectService: ProjectService, private datePipe: DatePipe, private tapeService: TapeService) { }

  ngOnInit(): void {

    this.projectService.currentProjectIsOwner$.subscribe((value: boolean) => {
      this.isOwner = value;
      console.log('value', value)
    })


    this.photoArray.push({ url: this.Item.imageLink })
  }

  getFormattedDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd.MM.yyyy в HH.mm');
  }

  deletePost() {
    this.tapeService.deletePost(this.Item.id).subscribe((value: boolean) => {
      this.tapeService.getTapes(this.tapeService.projectId).subscribe((data: any) => {
        this.tapeService.setItemsList(data.data);
      })
    })
  }

}