import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent {

  @Input() itemData: any;

}



