import { Component } from '@angular/core';
import { SettingHeaderService } from '../setting-header.service';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { FormSettingService } from '../form/form-setting.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor( public settingHeaderService: SettingHeaderService,
    private router: Router, private homeService: HomeService,
    private formSettingService: FormSettingService) {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggle(button: string) {
    this.homeService.typeToggle = button;
    console.log(this.homeService.typeToggle)
    this.router.navigate(['/']);
  }

  handlePostResume(): void {
    this.formSettingService.isheading = false;
    this.formSettingService.typeForm = 'резюме';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/newResume`]);
  }

  handlePostVacancy(): void {
    this.formSettingService.isheading = true;
    this.formSettingService.typeForm = 'вакансии';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/newVacancy`]);
  }


}
