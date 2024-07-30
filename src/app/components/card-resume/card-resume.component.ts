import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-resume.component.html',
  styleUrl: './card-resume.component.css'
})
export class CardResumeComponent {

  @Input() cardItem: {
    specialization: string;
    skills: string[]; 
    motivations: string[]; 
    lastName: string;
    firstName: string;
    floor: string;
    date: string;
  } = {
    specialization: '',
    skills: [],
    motivations: [], 
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
