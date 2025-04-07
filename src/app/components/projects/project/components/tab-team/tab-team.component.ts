import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewPeopleComponent } from './new-people/new-people.component';
import { MuTeamComponent } from './mu-team/mu-team.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpService } from './pop-up/pop-up.service';

@Component({
  selector: 'app-tab-team',
  standalone: true,
  imports: [CommonModule, MuTeamComponent, NewPeopleComponent, PopUpComponent],
  templateUrl: './tab-team.component.html',
  styleUrl: './tab-team.component.css'
})
export class TabTeamComponent {

  constructor(private popUpService: PopUpService) { }

  isVisible:boolean = true;

  ngOnInit(): void {
    this.popUpService.visible$.subscribe((value: any) => {
      this.isVisible = value;
    })

  }
}
