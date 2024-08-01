import { Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css'
})
export class ToggleSwitchComponent {
  
  activeButton: string = '';

  constructor(public homeService: HomeService){ }

  ngOnInit(): void {
    this.activeButton = this.homeService.typeToggle;
  }

  toggle(button: string) {
    this.activeButton = button;
    this.homeService.typeToggle = button;
  }
}
