import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class PersonalVacancyComponent {

  @Input() cardItem: {
    title: string;
    context: string;
    skills: string[]; // Adjust type for skills if needed
    motivations: string[]; // Corrected property name
    fullName: string;
    date: string;
  } = {
    title: '',
    context: '',
    skills: [],
    motivations: [], // Corrected property name
    fullName: '',
    date: ''
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

  isSettingActive: boolean = false;
  
  Actived() {
    this.isSettingActive = !this.isSettingActive
  }
  
}
