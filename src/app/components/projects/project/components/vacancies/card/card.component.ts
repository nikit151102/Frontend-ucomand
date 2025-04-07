import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private router: Router) { }
  
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
        return '#FFAB00';
      case 'Нужна практика':
        return '#CF87F1';
      case 'За долю':
        return '#298CF4';
      case 'За оплату':
        return '#23B9B0';
      default:
        return '';
    }
  }

  viewUser(event: Event,id: string) {
    event.stopPropagation(); 
    event.preventDefault();
    this.router.navigate([``, id]);
  }

  
}
