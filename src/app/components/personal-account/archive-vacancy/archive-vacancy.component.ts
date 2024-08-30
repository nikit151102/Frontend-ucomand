import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-archive-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-vacancy.component.html',
  styleUrl: './archive-vacancy.component.css'
})
export class ArchiveVacancyComponent {

  constructor(private vacancyService: VacancyService) { }

  @Input() cardItem: any;

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
      this.vacancyService.setArchive(this.cardItem.id, this.cardItem).subscribe(
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
      this.vacancyService.deleteById(this.cardItem.id).subscribe(
        (response: any) => {
          console.log("user", response);

        });
    }
    (error: any) => {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  }
}


