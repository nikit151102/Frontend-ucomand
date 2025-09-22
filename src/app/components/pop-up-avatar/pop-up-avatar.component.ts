import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpAvatarService } from './pop-up-avatar.service';
import { ItemAvatarComponent } from './item-avatar/item-avatar.component';
import { CommonModule } from '@angular/common';
import { AvatarSelectionService } from './avatar-selection.service';
import { HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';
import { PersonalDataService } from '../personal-account/personal-data/personal-data.service';

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

  constructor(private avatarSelectionService: AvatarSelectionService, private popUpAvatarService: PopUpAvatarService, private router: Router, private personalDataService: PersonalDataService) { }

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
    console.log('serverSelectedAvatar', this.serverSelectedAvatar)
    if (this.serverSelectedAvatar) {
      this.selectedAvatar = this.serverSelectedAvatar;
      this.avatarSelectionService.selectAvatar(this.selectedAvatar);
      this.fileUrl = this.serverSelectedAvatar
    }
  }

  cancel(): void {
    this.popUpAvatarService.hidePopup();
  }

  // selectAvatar(): void {
  //   this.avatarSelectionService.selectedAvatar$.subscribe((value:any)=>{
  // const formData = new FormData();

  //   formData.append('avatar', value);

  //   this.avatarSelectionService.setAvatar(formData).subscribe((response) => {
  //     console.log('Avatar updated successfully:', response);
  //     this.avatarSelectionService.selectAvatar(response.avatarUrl);
  //     this.avatarSelectionService.selectGender('custom');
  //   }, (error) => {
  //     console.error('Error uploading avatar:', error);
  //   });

  //   this.popUpAvatarService.hidePopup();
  //   })

  // }


selectAvatar(): void {
  this.avatarSelectionService.selectedAvatar$
    .pipe(take(1))
    .subscribe((value: any) => {
      if (!value) {
        console.error('No avatar selected');
        return;
      }

      console.log('Received value type:', typeof value, value);

      // Если это blob URL (строка начинающаяся с 'blob:')
      if (typeof value === 'string' && value.startsWith('blob:')) {
        console.warn('Blob URL detected - need to handle this case');
        // Если у вас есть файл в this.file, используйте его
        if (this.file) {
          this.uploadFile(this.file);
        } else {
          console.error('No file available for blob URL');
        }
      }
      // Если это настоящий File объект
      else if (value instanceof File) {
        this.uploadFile(value);
      }
      // Если это обычный URL строки
      else if (typeof value === 'string') {
        this.updateAvatarUrl(value);
      }
      else {
        console.error('Unsupported avatar format:', value);
      }
    });
}

private uploadFile(file: File): void {
  const formData = new FormData();
  formData.append('avatar', file, file.name); // Добавляем имя файла

  console.log('Uploading file:', file.name, 'size:', file.size, 'type:', file.type);

  this.avatarSelectionService.setAvatar(formData).subscribe({
    next: (response) => {
      console.log('Avatar updated successfully:', response);
      const avatarUrl = response ;
      if (avatarUrl) {
        this.avatarSelectionService.selectAvatar(avatarUrl);
        this.avatarSelectionService.selectGender('custom');
        this.popUpAvatarService.hidePopup();
      }
    },
    error: (error) => {
      console.error('Error uploading avatar:', error);
      // Добавьте обработку ошибок
    }
  });
}

private updateAvatarUrl(url: string): void {
  this.personalDataService.getCurrentUser().subscribe({
    next: (user: any) => {
      user.imageLink = url;
      this.personalDataService.updateUser(user).subscribe({
        next: (response) => {
          console.log('Avatar URL updated successfully');
          const imageLink = response?.imageLink || url;
          this.avatarSelectionService.selectAvatar(imageLink);
          this.avatarSelectionService.selectGender('custom');
          this.popUpAvatarService.hidePopup();
        },
        error: (error) => {
          console.error('Error updating URL:', error);
        }
      });
    },
    error: (error) => {
      console.error('Error getting user:', error);
    }
  });
}

  file: File | null = null;
  fileUrl: string = '';


  onSetAvatar(file: File): void {
    console.log('File received:', file);
    this.file = file;
  }

}
