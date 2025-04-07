import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PhotoGridComponent } from './photo-grid/photo-grid.component';
import { ProjectService } from '../../project.service';
import { TapeService } from '../tape/tape.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsService } from '../reviews/reviews.service';


@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, PhotoGridComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
  providers: [DatePipe]
})
export class ReviewCardComponent implements OnInit {
  @Input() Item!: any;
  @Input() visibleFoto: boolean = false;
  isOwner: boolean = false;
  photoArray: { url: any }[] = [];
  isEditing: boolean = false;
  editedContent: string = '';
  userNickname: any;

  constructor(private projectService: ProjectService,
    private datePipe: DatePipe, private tapeService: TapeService,
    private reviewsService: ReviewsService) { }

  ngOnInit(): void {

    this.projectService.currentProjectIsOwner$.subscribe((value: boolean) => {
      this.isOwner = value;
    });

    this.userNickname = localStorage.getItem('userNickname')
    if (this.Item.imageLink) {
      this.photoArray.push({ url: this.Item.imageLink });
    }

    this.editedContent = this.Item.content; // Заполняем начальное значение
  }

  getFormattedDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd.MM.yyyy в HH.mm');
  }

  deletePost() {
    this.tapeService.deletePost(this.Item.id).subscribe(() => {
      this.tapeService.getTapes(this.tapeService.projectId).subscribe((data: any) => {
        this.tapeService.setItemsList(data.data);
      });
    });
  }


  toggleEdit() {
    this.isEditing = !this.isEditing; // Переключаем режим редактирования
  }

  deletePhoto() {
    this.photoArray = []; // Очищаем фото
  }

  sendMessage() {
    if (this.editedContent.trim()) {
      if (!this.photoArray) {
        this.reviewsService.editComment(this.Item.id, '', this.editedContent).subscribe((data: any) => {
          this.reviewsService.updateItemById(this.Item.id, data);
        })
      } else {
        this.updatePost();
      }
      this.Item.content = this.editedContent; // Обновляем контент
      this.isEditing = false; // Закрываем режим редактирования
      console.log('Сообщение опубликовано:', this.editedContent);
    } else {
      console.log('Ошибка: нельзя отправить пустой текст');
    }
  }

  clearText() {
    this.editedContent = this.Item.content; // Сбрасываем изменения
    this.isEditing = false; // Закрываем режим редактирования
    console.log('Редактирование отменено');
  }


  updatePost() {
    const updatedPost = {
      id: this.Item.id,
      title: this.Item.title,
      imageLink: this.Item.imageLink,
      content: this.editedContent,
    };

    this.tapeService.updatePost(this.Item.id, updatedPost).subscribe(
      (response) => {
        console.log('Пост успешно обновлён:', response);
        this.Item.content = this.editedContent; // Обновляем контент локально
        this.isEditing = false; // Закрываем режим редактирования
      },
      (error) => {
        console.error('Ошибка при обновлении поста:', error);
      }
    );
  }


  deleteComment() {
    this.reviewsService.deleteComment(this.Item.id).subscribe((data: any) => {
      this.reviewsService.removeItemById(this.Item.id);
    })
  }
}
