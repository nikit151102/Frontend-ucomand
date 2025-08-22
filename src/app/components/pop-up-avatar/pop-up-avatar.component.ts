import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpAvatarService } from './pop-up-avatar.service';
import { ItemAvatarComponent } from './item-avatar/item-avatar.component';
import { CommonModule } from '@angular/common';
import { AvatarSelectionService } from './avatar-selection.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pop-up-avatar',
  standalone: true,
  imports: [CommonModule, ItemAvatarComponent],
  templateUrl: './pop-up-avatar.component.html',
  styleUrl: './pop-up-avatar.component.css'
})
export class PopUpAvatarComponent {

  @Input() gender: any = '';
  @Input() serverSelectedAvatar: string | null = null;

  constructor(private avatarSelectionService: AvatarSelectionService, private popUpAvatarService: PopUpAvatarService, private router: Router) { }

  avatarSrc: string = 'default-avatar';
  selectedAvatar: string | null = null;

  private allAvatars: any = {
    '': [
      'image1_male', 'image2_male', 'image3_male', 'image4_male', 'image5_male', 'image6_male',
      'image7_male', 'image8_male', 'image1_female', 'image2_female', 'image3_female',
      'image4_female', 'image5_female', 'image6_female', 'image7_female', 'image8_female'
    ],
    'MALE': [
      'image1_male', 'image2_male', 'image3_male', 'image4_male', 'image5_male', 'image6_male',
      'image7_male', 'image8_male'
    ],
    'FEMALE': [
      'image1_female', 'image2_female', 'image3_female', 'image4_female', 'image5_female',
      'image6_female', 'image7_female', 'image8_female'
    ]
  };

  get filteredAvatars(): string[] {
    return this.allAvatars[this.gender] || this.allAvatars[''];
  }

  ngOnInit(): void {
    if (this.serverSelectedAvatar) {
      this.selectedAvatar = this.serverSelectedAvatar;
      this.avatarSelectionService.selectAvatar(this.selectedAvatar);
    }
  }

  cancel(): void {
    this.popUpAvatarService.hidePopup();
  }

  selectAvatar(): void {
    this.setAvatar();
    this.popUpAvatarService.hidePopup();
  }

  file: File | null = null;
  fileUrl: string = '';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileUrl = URL.createObjectURL(file);
    }
  }


  setAvatar(): void {
    console.log('setAvatar')
    if (this.file) {
      // Формируем FormData для отправки файла
      const formData = new FormData();
      formData.append('avatar', this.file);

      // Отправка запроса на сервер
      this.avatarSelectionService.setAvatar(formData).subscribe((response) => {
        console.log('Avatar updated successfully:', response);
        this.avatarSelectionService.selectAvatar(response);
        this.avatarSelectionService.selectGender(response);
      })
    } else {
      console.error('User data or token missing');
    }
  }

}
