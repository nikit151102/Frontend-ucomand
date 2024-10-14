import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SettingHeaderService } from '../setting-header.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { HomeService } from '../home/home.service';
import { FormSettingService } from '../form/form-setting.service';
import { Location } from '@angular/common';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { PopUpErrorCreateService } from '../pop-up-error-create/pop-up-error-create.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuNavService } from './menu-nav.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css',
})
export class MenuNavComponent implements OnInit {

  sidebarVisible: boolean = false;
  activeTopic: string = 'dark';
  activeButton: string = 'vacancy';
  isAuthenticated!: boolean;
  userAccess: string | null = '';

  currentUserLogo: any;
  buttonsConfig: { label: string, class: string, action: () => void }[] = [];
  constructor(private location: Location, public settingHeaderService: SettingHeaderService,
    private router: Router, public tokenService: TokenService, private homeService: HomeService,
    private ngZone: NgZone, private cdr: ChangeDetectorRef, private formSettingService: FormSettingService,
    private popUpErrorCreateService: PopUpErrorCreateService, private popUpEntryService: PopUpEntryService, public menuNavService: MenuNavService
  ) {
  }


  ngOnInit(): void {

    this.userAccess = localStorage.getItem('USaccess');
    
    console.log("userAccess",this.userAccess)

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          this.settingHeaderService.isSticky = false;
        }
      }
    });
    this.menuNavService.getStorageValue().subscribe(value => {
      this.currentUserLogo = value;
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.toggleTopic(savedTheme);

    this.tokenService.isAuthenticated$.subscribe(isAuthenticated => {
      this.ngZone.run(() => {
        this.isAuthenticated = isAuthenticated;
        this.setButtons();
        this.cdr.detectChanges();
      });
    });
  }

  isImageAvatar(logo: string): boolean {
    return logo.trim().startsWith('image');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.sidebarVisible = false;
  }

  setButtons(): void {
    if (this.isAuthenticated) {
      this.buttonsConfig = [
        { label: 'Разместить резюме', class: "grnBtn btnAdditional", action: () => this.handlePostResume() },
        { label: 'Разместить вакансию', class: "grnBtn btnAdditional", action: () => this.handlePostVacancy() }
      ];
    } else {
      this.buttonsConfig = [
        { label: 'Войти&nbsp;в аккаунт', class: "grnBtn", action: () => this.handleLogin() },
        { label: 'Регистрация', class: "grnBtn", action: () => this.handleRegistration() }
      ];
    }
    this.cdr.detectChanges();
  }

  handlePostResume(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.sidebarVisible = false;
      this.router.navigate([`/${userId}/account/newResume`]);
    } else {
      this.popUpErrorCreateService.visible = true;
      this.sidebarVisible = false;
    }
  }

  handlePostVacancy(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = true;
      this.formSettingService.typeForm = 'вакансии';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.sidebarVisible = false;
      this.router.navigate([`/${userId}/account/newVacancy`]);
    } else {
      this.popUpErrorCreateService.visible = true;
      this.sidebarVisible = false;
    }
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
    this.homeService.toggleType(button);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
    this.sidebarVisible = false;
  }

  viewUser() {
    const userId = localStorage.getItem('userNickname')
    this.sidebarVisible = false;
    this.router.navigate([`/${userId}`]);
  }

  toggleTopic(savedTheme: any = '') {
    if (!savedTheme) {
      this.activeTopic = this.activeTopic === 'light' ? 'dark' : 'light';
      this.sidebarVisible = false;
      this.homeService.changeTheme(this.activeTopic);
    } else {
      this.activeTopic = savedTheme;
      this.homeService.changeTheme(this.activeTopic);
    }
    localStorage.setItem('theme', this.activeTopic);
    if (this.activeTopic === 'dark') {
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
      document.documentElement.style.setProperty('--screensaver-color', '#a6eb20');
      document.documentElement.style.setProperty('--screensaver-background', '#474748');
      document.documentElement.style.setProperty('--tag-background', 'rgba(243, 243, 243, 0.1)');
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
      document.documentElement.style.setProperty('--screensaver-color', '#101010');
      document.documentElement.style.setProperty('--screensaver-background', '#a6eb20');
      document.documentElement.style.setProperty('--tag-background', '#F3F3F3');
    }
  }

}
