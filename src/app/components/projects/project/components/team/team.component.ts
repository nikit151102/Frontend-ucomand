import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParticipantComponent } from './participant/participant.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  
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

