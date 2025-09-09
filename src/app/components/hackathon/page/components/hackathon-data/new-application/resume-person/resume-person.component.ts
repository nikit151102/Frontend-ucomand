import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resume-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-person.component.html',
  styleUrl: './resume-person.component.css'
})
export class ResumePersonComponent {

  @Input() item: any;
  @Output() itemSelected = new EventEmitter<any>();
  
  isSelected: boolean = false;
  
  onAvatarClick(event: Event, project: string): void {
    if (this.isSelected) {
      this.isSelected = false;
      this.itemSelected.emit(null); // Отправляем null при снятии выбора
    } else {
      this.isSelected = true;
      this.itemSelected.emit(this.item); // Отправляем item при выборе
    }
    event.stopPropagation();
  }

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
}
