import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PopUpDeleteService } from './pop-up-delete.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-delete.component.html',
  styleUrl: './pop-up-delete.component.css'
})
export class PopUpDeleteComponent {

  constructor(public popUpDeleteService:PopUpDeleteService){}

  cancel(): void {
    this.popUpDeleteService.hidePopup();  
  }
}