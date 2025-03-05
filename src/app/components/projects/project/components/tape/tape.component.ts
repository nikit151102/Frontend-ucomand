import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { PersonalDataService } from '../../../../personal-account/personal-data/personal-data.service';
import { ProjectService } from '../../project.service';
import { FormsModule } from '@angular/forms';
import { PhotoGridComponent } from '../review-card/photo-grid/photo-grid.component';
import { TapeService } from './tape.service';

@Component({
  selector: 'app-tape',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent, FormsModule, PhotoGridComponent],
  templateUrl: './tape.component.html',
  styleUrl: './tape.component.css'
})
export class TapeComponent {

  currentUser: any;
  isTextEntered: boolean = false;
  commentText: any;
  currentProjectData: any;
  itemsList: any;

  constructor(private personalDataService: PersonalDataService, private projectService: ProjectService, private tapeService: TapeService) { }

  ngOnInit(): void {
    this.tapeService.itemsList$.subscribe((values: any) => {
      this.itemsList = values;
    })

    this.personalDataService.getCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      })

    this.projectService.currentProjectData$.subscribe((data: any) => {
      this.currentProjectData = data;
      this.tapeService.projectId = data.id;
      this.tapeService.getTapes(data.id).subscribe((data: any) => {
        this.tapeService.setItemsList(data.data);
      })
    })


  }


  autoExpand(textArea: HTMLTextAreaElement): void {
    textArea.style.height = 'auto'; // Сбрасываем высоту
    textArea.style.height = textArea.scrollHeight + 'px'; // Устанавливаем новую высоту
  }

  checkInput(value: string): void {
    this.isTextEntered = value.trim().length > 0; // Если есть текст, показываем кнопки
  }

  clearText(): void {
    const textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (textArea) {
      textArea.value = "";
      textArea.style.height = "auto"; // Сброс высоты
    }
    this.isTextEntered = false; // Скрываем кнопки
  }

  selectedImage: any = null;

  photoArray: { url: string }[] = [];
  uploadImage(event: Event): void {
    this.photoArray = [];
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.selectedImage = file;

      // Создаём URL для отображения изображения
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoArray.push({ url: e.target?.result as string })
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.photoArray = [];
  }


  sendMessage(): void {
    if (!this.commentText?.trim()) return; // Проверяем, что текст не пустой
  
    this.tapeService.setPost(this.currentProjectData.id, '', this.commentText).subscribe((post: any) => {
      
      if (this.selectedImage) {
        this.tapeService.uploadPostImage(post.id, this.selectedImage).subscribe((imageResponse: any) => {
          console.log('Изображение успешно загружено', imageResponse);
  
          // Добавляем URL изображения к посту
          post.imageUrl = imageResponse.url;
  
          // Добавляем новый пост в начало списка
          this.itemsList = [post, ...this.itemsList];
  
          // Очищаем форму
          this.clearText();
          this.removeImage();
  
        }, error => {
          console.error('Ошибка загрузки изображения:', error);
        });
      } else {
        // Если без изображения, сразу добавляем
        this.itemsList = [post, ...this.itemsList];
  
        // Очищаем форму
        this.clearText();
      }
  
    }, error => {
      console.error('Ошибка публикации поста:', error);
    });
  }
  


}
