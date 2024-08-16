import { Component } from '@angular/core';
import { PopUpEntryService } from './pop-up-entry.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-pop-up-entry',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './pop-up-entry.component.html',
  styleUrl: './pop-up-entry.component.css'
})
export class PopUpEntryComponent {

  constructor(public popUpEntryService: PopUpEntryService, public tokenService: TokenService) { }

  login_enter(){
    this.popUpEntryService.visible = false;
    this.tokenService.setToken()
  }

}
