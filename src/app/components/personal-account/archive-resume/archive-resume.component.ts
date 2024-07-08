import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archive-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-resume.component.html',
  styleUrl: './archive-resume.component.css'
})
export class ArchiveResumeComponent {
  
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
