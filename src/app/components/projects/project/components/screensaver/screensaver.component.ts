import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-screensaver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screensaver.component.html',
  styleUrl: './screensaver.component.css'
})
export class ScreensaverComponent {

  tags = ['Стартап','Компания','Разовый проект']
  
}
