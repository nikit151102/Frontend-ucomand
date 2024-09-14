import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormSettingService } from '../../../form/form-setting.service';
import { PopUpEntryService } from '../../../pop-up-entry/pop-up-entry.service';
import { SettingHeaderService } from '../../../setting-header.service';
import { TokenService } from '../../../token.service';

@Component({
  selector: 'app-phone-type',
  standalone: true,
  imports: [],
  templateUrl: './phone-type.component.html',
  styleUrl: './phone-type.component.css'
})
export class PhoneTypeComponent {

  constructor(private tokenService: TokenService,
    private popUpEntryService: PopUpEntryService,
    private settingHeaderService: SettingHeaderService,
    private formSettingService: FormSettingService,
    private router: Router) { }


  handlePostResume() {
    if (this.tokenService.getToken()) {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      const userId = localStorage.getItem('userId')
      this.router.navigate([`/myaccount/${userId}/newResume`]);
    } else {
      this.popUpEntryService.showDialog();
    }
  }

  handlePostVacancy() {
    if (this.tokenService.getToken()) {
      this.formSettingService.isheading = true;
      this.formSettingService.typeForm = 'вакансии';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      const userId = localStorage.getItem('userId')
      this.router.navigate([`/myaccount/${userId}/newVacancy`]);
    } else {
      this.popUpEntryService.showDialog();
    }
  }

}
