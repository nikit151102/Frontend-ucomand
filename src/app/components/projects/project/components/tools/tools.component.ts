import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParticipantComponent } from './participant/participant.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {

  itemsList = [
    {
      lastName: 'Чаплыгин',
      firstName: 'Роман',
      imageLink: 'image1_male',
      nickname: 'us',
      profession: 'Администратор'
    },
    {
      lastName: 'Ивановский',
      firstName: 'Иван',
      imageLink: 'image4_male',
      nickname: 'us',
      profession: 'SMM менеджер'
    },
    {
      lastName: 'Иванова',
      firstName: 'Марина',
      imageLink: 'image7_female',
      nickname: 'us',
      profession: 'Дизайнер'
    },
  ]
}
