import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-project.component.html',
  styleUrl: './personal-project.component.css'
})
export class PersonalProjectComponent {

  @Input() item: any;
  
}
