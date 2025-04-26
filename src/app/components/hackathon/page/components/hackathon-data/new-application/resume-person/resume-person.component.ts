import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resume-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-person.component.html',
  styleUrl: './resume-person.component.css'
})
export class ResumePersonComponent {

  @Input() item: any = {
    profession: "Менеджер",
    competenceLevel: 2
  };
  isSelected: boolean = false;
  onAvatarClick(event: Event, project: string): void {
    if (this.isSelected) {
      // this.projectService.selectProject('');
      this.isSelected = false;
    } else {
      // this.projectService.selectProject(project);
      this.isSelected = true;
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
