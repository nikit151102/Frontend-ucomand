import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archive-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-vacancy.component.html',
  styleUrl: './archive-vacancy.component.css'
})
export class ArchiveVacancyComponent {

  @Input() cardItem: {
    title: string;
    context: string;
    date: string;
  } = {
      title: 'title',
      context: 'context',
      date: '08.07.2024'
    };

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

}
