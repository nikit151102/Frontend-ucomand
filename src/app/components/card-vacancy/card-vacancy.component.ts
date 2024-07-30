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

  @Input() cardItem: {
    title: string;
    context: string;
    skills: string[]; // Adjust type for skills if needed
    motivations: string[]; // Corrected property name
    lastName: string;
    firstName: string;
    floor: string;
    date: string;
  } = {
    title: '',
    context: '',
    skills: [],
    motivations: [], // Corrected property name
    lastName: '',
    firstName: '',
    floor: '',
    date: ''
  };
  

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
