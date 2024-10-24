import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface item {
  lastName: string;
  firstName: string;
  imageLink: string;
  nickname: string;
  profession: string;
}

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent {

  @Input() itemData: item = {
    lastName: '',
    firstName: '',
    imageLink: '',
    nickname: '',
    profession: ''
  }

}



