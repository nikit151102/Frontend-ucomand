import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SettingHeaderService } from '../setting-header.service';
import { NavigationStart, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { HomeService } from '../home/home.service';
import { FormSettingService } from '../form/form-setting.service';
import { Location } from '@angular/common';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent implements OnInit {

  sidebarVisible: boolean = false;
  activeTopic: string = 'dark';
  activeButton: string = 'vacancy';
  isAuthenticated!: boolean;

  buttonsConfig: { label: string, action: () => void }[] = [];
  constructor(private location: Location, public settingHeaderService: SettingHeaderService,
    private router: Router, public tokenService: TokenService, private homeService: HomeService,
    private formSettingService: FormSettingService, private cdr: ChangeDetectorRef,
    private popUpEntryService: PopUpEntryService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          this.settingHeaderService.isSticky = false;
        }
      }
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.toggleTopic(savedTheme);

    this.tokenService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
        this.setButtons();
      });
    });
  }

  
  navigateTo(path: string) {
    this.router.navigate([path]);
    this.sidebarVisible = false;
  }

  setButtons(): void {
    if (this.isAuthenticated) {
      this.buttonsConfig = [
        { label: 'Разместить резюме', action: () => this.handlePostResume() },
        { label: 'Разместить вакансию', action: () => this.handlePostVacancy() }
      ];
    } else {
      this.buttonsConfig = [
        { label: 'Войти в аккаунт', action: () => this.handleLogin() },
        { label: 'Регистрация', action: () => this.handleRegistration() }
      ];
    }
    this.cdr.detectChanges(); 
  }

  handlePostResume(): void {
    this.formSettingService.isheading = false;
    this.formSettingService.typeForm = 'резюме';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.sidebarVisible = false;
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/newResume`]);
  }

  handlePostVacancy(): void {
    this.formSettingService.isheading = true;
    this.formSettingService.typeForm = 'вакансии';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.sidebarVisible = false;
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/newVacancy`]);
  }

  handleLogin(): void {
    this.sidebarVisible = false;
    this.popUpEntryService.showDialog();
  }

  handleRegistration(): void {
    this.sidebarVisible = false;
    this.popUpEntryService.showDialog();
  }

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

    localStorage.setItem('theme', type);
    if (type === 'dark') {
      document.documentElement.style.setProperty('--background', '#333334');
      document.documentElement.style.setProperty('--background-card', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--card-hover', '#5a4bb8');
      document.documentElement.style.setProperty('--font-color', '#fff');
      document.documentElement.style.setProperty('--background-archive', 'rgba(255, 255, 255, 0.05)');
      document.documentElement.style.setProperty('--card-archive', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--background-card-account', '#5a4bb8');
      document.documentElement.style.setProperty('--card-hover-account', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--line-item', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--logo-text-color', '#fff');
      document.documentElement.style.setProperty('--logo-background-color', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--font-profession-eng', 'rgba(255, 255, 255, 0.3)');
    } else {
      document.documentElement.style.setProperty('--background', '#f2f2f2');
      document.documentElement.style.setProperty('--background-card', '#fff');
      document.documentElement.style.setProperty('--card-hover', '#a6eb20');
      document.documentElement.style.setProperty('--font-color', '#101010');
      document.documentElement.style.setProperty('--background-archive', '#e2e2e2');
      document.documentElement.style.setProperty('--card-archive', '#fff');
      document.documentElement.style.setProperty('--background-card-account', '#fff');
      document.documentElement.style.setProperty('--card-hover-account', '#a6eb20');
      document.documentElement.style.setProperty('--line-item', 'rgba(0, 0, 0, 0.1)');
      document.documentElement.style.setProperty('--logo-text-color', '#5a4bb8');
      document.documentElement.style.setProperty('--logo-background-color', 'rgba(185, 174, 255, 1)');
      document.documentElement.style.setProperty('--font-profession-eng', 'rgba(0, 0, 0, 0.3)');
      
    }
  }

}
