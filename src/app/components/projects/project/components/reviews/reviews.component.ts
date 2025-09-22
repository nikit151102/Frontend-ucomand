import { Component, OnInit } from '@angular/core';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { CommonModule } from '@angular/common';
import { PersonalDataService } from '../../../../personal-account/personal-data/personal-data.service';
import { ReviewsService } from './reviews.service';
import { ProjectService } from '../../project.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})

export class ReviewsComponent implements OnInit {

  constructor(private personalDataService: PersonalDataService, private projectService: ProjectService, private reviewsService: ReviewsService) { }
  projectData: any;
  commentText: any;
  currentUser: any;
  itemsLisat: any = []
  isTextEntered: boolean = false;

  ngOnInit(): void {
    this.reviewsService.itemsReviews$.subscribe((data: any) => {
      this.itemsLisat = data;
    })

    this.personalDataService.getCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      })

    this.projectService.currentProjectData$.subscribe((value: any) => {
      this.projectData = value;
      console.log('this.projectData', this.projectData)
      if (this.projectData?.id) {
        this.reviewsService.getComments(this.projectData.id).subscribe(
          (response: any) => {
            this.reviewsService.setItemsList(response);
          },
          (error) => {
            console.error('Error fetching vacancies:', error);
          }
        );
      }
    });
  }

  autoExpand(textArea: HTMLTextAreaElement): void {
    textArea.style.height = 'auto'; // Сбрасываем высоту
    textArea.style.height = textArea.scrollHeight + 'px'; // Устанавливаем новую высоту
  }

  checkInput(value: string): void {
    this.isTextEntered = value.trim().length > 0; // Если есть текст, показываем кнопки
  }

  sendMessage(): void {
    this.reviewsService.addComment(this.projectData.id, '', this.commentText).subscribe(
      (newComment: any) => {
        console.log('Добавленный комментарий:', newComment);

       this.reviewsService.addItemToStart(newComment)

        // Принудительное обновление представления
        this.commentText = '';
        this.isTextEntered = false;
      },
      (error) => {
        console.error('Ошибка при добавлении комментария:', error);
      }
    );
  }


  clearText(): void {
    const textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (textArea) {
      textArea.value = "";
      textArea.style.height = "auto"; // Сброс высоты
    }
    this.isTextEntered = false; // Скрываем кнопки
  }
}

