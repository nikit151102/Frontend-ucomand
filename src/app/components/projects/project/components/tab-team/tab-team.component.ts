import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewPeopleComponent } from './new-people/new-people.component';
import { MuTeamComponent } from './mu-team/mu-team.component';

@Component({
  selector: 'app-tab-team',
  standalone: true,
  imports: [CommonModule, MuTeamComponent, NewPeopleComponent],
  templateUrl: './tab-team.component.html',
  styleUrl: './tab-team.component.css'
})
export class TabTeamComponent {

}
