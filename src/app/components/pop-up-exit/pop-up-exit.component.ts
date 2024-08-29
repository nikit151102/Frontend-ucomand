import { Component } from '@angular/core';
import { PopUpExitService } from './pop-up-exit.service';

@Component({
  selector: 'app-pop-up-exit',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-exit.component.html',
  styleUrl: './pop-up-exit.component.css'
})
export class PopUpExitComponent {

  constructor(public popUpExitService:PopUpExitService){}

  cancel(): void {
    this.popUpExitService.hidePopup();  
  }

}
