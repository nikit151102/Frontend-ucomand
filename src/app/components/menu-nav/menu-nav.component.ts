import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SettingHeaderService } from '../setting-header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule ,SidebarModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {
  
  constructor(public settingHeaderService:SettingHeaderService, private router: Router){}

  sidebarVisible: boolean = false;

  activeButton: string = 'vacancies';

  toggle(button: string) {
    this.activeButton = button;
  }

  viewUser() {
    this.router.navigate([`/myaccount`,'root']);
  }
}
