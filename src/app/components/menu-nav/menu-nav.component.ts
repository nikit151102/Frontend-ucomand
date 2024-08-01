import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SettingHeaderService } from '../setting-header.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { HomeService } from '../home/home.service';
import { FormSettingService } from '../form/form-setting.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {

  constructor(private location: Location, public settingHeaderService: SettingHeaderService, private router: Router, public tokenService: TokenService, private homeService: HomeService, private formSettingService: FormSettingService) { }
  
  sidebarVisible: boolean = false;
  activeTopic: string = 'dark';
  activeButton: string = 'vacancy';

  goBack(): void {
    this.location.back();
  }

  toggle(button: string) {
    this.homeService.typeToggle = button;
    this.activeButton = button;
    console.log(this.homeService.typeToggle)
    this.router.navigate(['/']);
    this.sidebarVisible = false;
  }

  viewUser() {
    this.router.navigate([`/myaccount`, 'root']);
    this.sidebarVisible = false;
  }

  toggleTopic(type: string) {
    this.activeTopic = type;
    this.sidebarVisible = false;
    if(type === 'dark'){
      document.documentElement.style.setProperty('--background', '#333334');
      document.documentElement.style.setProperty('--background-card', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--card-hover', '#5a4bb8');
      document.documentElement.style.setProperty('--font-color', '#fff');
      document.documentElement.style.setProperty('--background-archive', '#101010');
      document.documentElement.style.setProperty('--card-archive', '#272727');
      document.documentElement.style.setProperty('--background-card-account', '#5a4bb8');
      document.documentElement.style.setProperty('--card-hover-account', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--line-item', 'rgba(255, 255, 255, 0.1)');
      
    }else{
      document.documentElement.style.setProperty('--background', '#f2f2f2');
      document.documentElement.style.setProperty('--background-card', '#fff');
      document.documentElement.style.setProperty('--card-hover', '#a6eb20');
      document.documentElement.style.setProperty('--font-color', '#101010');
      document.documentElement.style.setProperty('--background-archive', '#e2e2e2');
      document.documentElement.style.setProperty('--card-archive', '#fff');
      document.documentElement.style.setProperty('--background-card-account', '#fff');
      document.documentElement.style.setProperty('--card-hover-account', '#a6eb20');
      document.documentElement.style.setProperty('--line-item', 'rgba(0, 0, 0, 0.1)');
    }
    
  }  


  newVacancy() {
    this.formSettingService.isheading = true;
    this.formSettingService.typeForm = 'вакансии';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.sidebarVisible = false;
    this.router.navigate([`/newVacancy`]);
  }

  newResume() {
    this.formSettingService.isheading = false;
    this.formSettingService.typeForm = 'резюме';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.sidebarVisible = false;
    this.router.navigate([`/newResume`]);
  }
}
