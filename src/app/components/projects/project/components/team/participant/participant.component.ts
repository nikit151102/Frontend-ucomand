import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent {

  @Input() itemData: any;

  constructor(private router: Router){}

  onUserClick(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate([``, this.itemData.user.nickname]);
  }

}



