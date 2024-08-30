import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-archive-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-resume.component.html',
  styleUrl: './archive-resume.component.css'
})
export class ArchiveResumeComponent {
  
  @Input() cardItem: any;

  constructor(private resumeService:ResumeService){}

  getSkillsColor(item: string): string {
    switch (item) {
      case 'Junior':
        return '#50B229';
      case 'Middle':
        return '#FAD305';
      case 'Senior':
        return '#EE5354';
      default:
        return '';
    }
  }
  isSettingActive: boolean = false;
  
  Actived() {
    this.isSettingActive = !this.isSettingActive
  }

  refund() {
    if (this.cardItem) {
      { }
      this.cardItem.visibility = 'CREATOR_ONLY';
      this.resumeService.setArchive(this.cardItem.id, this.cardItem).subscribe(
        (response: any) => {
          console.log("user", response);

        });
    }
    (error: any) => {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  }

  deleteById() {
    if (this.cardItem) {
      { }
      this.cardItem.visibility = 'CREATOR_ONLY';
      this.resumeService.deleteById(this.cardItem.id).subscribe(
        (response: any) => {
          console.log("user", response);

        });
    }
    (error: any) => {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  }
}
