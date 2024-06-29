import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-background-imgs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-imgs.component.html',
  styleUrl: './background-imgs.component.css'
})
export class BackgroundImgsComponent {
  tagsList = ['Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных', 
                'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор']
}
