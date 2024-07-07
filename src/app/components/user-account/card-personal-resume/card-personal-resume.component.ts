import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-personal-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-personal-resume.component.html',
  styleUrl: './card-personal-resume.component.css'
})
export class CardPersonalResumeComponent {

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

}
