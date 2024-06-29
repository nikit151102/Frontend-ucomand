import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [SidebarModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {
  
  sidebarVisible: boolean = false;

  activeButton: string = 'vacancies';

  toggle(button: string) {
    this.activeButton = button;
  }
  
}
