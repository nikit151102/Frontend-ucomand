import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarSelectionService } from '../avatar-selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-avatar.component.html',
  styleUrl: './item-avatar.component.css'
})
export class ItemAvatarComponent implements OnInit {
  @Input() avatarSrc: string = '';
  @Input() default: boolean = true;
  isSelected: boolean = false;
  @Output() setAvatar = new EventEmitter<File>();

  constructor(private avatarSelectionService: AvatarSelectionService) { }

  ngOnInit(): void {
    this.avatarSelectionService.selectedAvatar$.subscribe(selectedAvatar => {
      if (this.default) {
        // Для стандартных аватаров сравниваем с avatarSrc
        this.isSelected = selectedAvatar === this.avatarSrc;
      } else {
        if (this.fileUrl) {
          // Если есть загруженное изображение, сравниваем с fileUrl
          this.isSelected = selectedAvatar === this.fileUrl;
        } else {
          // Если нет загруженного изображения, проверяем другие условия
          this.isSelected = !!(selectedAvatar && selectedAvatar !== '' && 
                              !selectedAvatar.includes('assets/avatars/'));
        }
      }
    });
  }

  

  file: File | null = null;
  @Input()  fileUrl: string = '';

  onDefaultAvatarClick(event: Event, avatar: string): void {
    if (this.isSelected) {
      this.avatarSelectionService.selectAvatar('');
      this.avatarSelectionService.selectGender('');
    } else {
      this.avatarSelectionService.selectAvatar(avatar);
      const gender = this.avatarSrc.split('_')[1];
      this.avatarSelectionService.selectGender(gender);
    }
    event.stopPropagation();
  }

  onCustomAvatarClick(event: Event): void {
    // Триггерим клик по скрытому input file
    const fileInput = document.getElementById('custom-avatar-input');
    if (fileInput) {
           this.isSelected = true;
      fileInput.click();
    }
    event.stopPropagation();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        console.error('Пожалуйста, выберите изображение');
        return;
      }

      // Проверяем размер файла
      if (file.size > 5 * 1024 * 1024) {
        console.error('Размер файла не должен превышать 5MB');
        return;
      }

      this.file = file;
      this.fileUrl = URL.createObjectURL(file);

      // Эмитируем событие с выбранным файлом
      this.setAvatar.emit(this.file);
      this.isSelected = true;

      // Автоматически выбираем кастомный аватар
      this.avatarSelectionService.selectAvatar(this.fileUrl);
      this.avatarSelectionService.selectGender('custom');
    }
  }


  onAvatarClick(event: Event, avatar: string): void {
    if (this.default) {
      if (this.isSelected) {
        this.avatarSelectionService.selectAvatar('');
        this.avatarSelectionService.selectGender('');
      } else {
        const fileInput = document.getElementById('custom-avatar-input');
        if (fileInput) {
          fileInput.click();
        }
      }
    }

    event.stopPropagation();
  }

}
