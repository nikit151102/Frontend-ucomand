import { Component } from '@angular/core';
import { SettingHeaderService } from '../setting-header.service';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { FormSettingService } from '../form/form-setting.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { TokenService } from '../token.service';

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
    private formSettingService: FormSettingService,
    private popUpEntryService: PopUpEntryService,
    private tokenService: TokenService) {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggle(button: string) {
    this.homeService.typeToggle = button;
    this.homeService.toggleType(button);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
  }

  handlePostResume() {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/${userId}/account/newResume`]);
    } else {
      this.popUpEntryService.showDialog();
    }
  }

  handlePostVacancy() {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = true;
      this.formSettingService.typeForm = 'вакансии';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/${userId}/account/newVacancy`]);
    } else {
      this.popUpEntryService.showDialog();
    }
  }


}
