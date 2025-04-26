import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewApplicationComponent } from './new-application/new-application.component';

@Component({
  selector: 'app-hackathon-data',
  standalone: true,
  imports: [CommonModule, NewApplicationComponent],
  templateUrl: './hackathon-data.component.html',
  styleUrl: './hackathon-data.component.css'
})
export class HackathonDataComponent {

}
