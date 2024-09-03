import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-vacancy.component.html',
  styleUrl: './card-vacancy.component.css'
})
export class CardVacancyComponent {

  @Input() cardItem: any
  
  getSkillsColor(item: number): string {
    switch (item) {
      case 1:
        return '#50B229';
      case 2:
        return '#FAD305';
      case 3:
        return '#EE5354';
      default:
        return '';
    }
  }
  
  getSkills(item: number): string {
    switch (item) {
      case 1:
        return 'Junior';
      case 2:
        return 'Middle';
      case 3:
        return 'Senior';
      default:
        return '';
    }
  }
  
  getMotivationColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#ffab00';
      case 'Практика':
        return '#cf87f1';
      case 'За долю':
        return '#298cf4';
      case 'За оплату':
        return '#23b9b0';
      default:
        return '';
    }
  }
}
