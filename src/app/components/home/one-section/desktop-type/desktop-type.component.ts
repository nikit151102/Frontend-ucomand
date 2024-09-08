import { Component } from '@angular/core';
import { BackgroundImgsComponent } from '../../../background-imgs/background-imgs.component';
import { TokenService } from '../../../token.service';
import { PopUpEntryService } from '../../../pop-up-entry/pop-up-entry.service';
import { SettingHeaderService } from '../../../setting-header.service';
import { FormSettingService } from '../../../form/form-setting.service';
import { Router } from '@angular/router';
import { PopUpErrorCreateService } from '../../../pop-up-error-create/pop-up-error-create.service';

@Component({
  selector: 'app-desktop-type',
  standalone: true,
  imports: [BackgroundImgsComponent],
  templateUrl: './desktop-type.component.html',
  styleUrl: './desktop-type.component.css'
})
export class DesktopTypeComponent {

  constructor(private tokenService: TokenService,
    private popUpEntryService: PopUpEntryService,
    private settingHeaderService: SettingHeaderService,
    private formSettingService: FormSettingService,
    private router: Router,
    private popUpErrorCreateService: PopUpErrorCreateService) { }

  handlePostResume() {
    if (this.tokenService.getToken()) {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;

      const fullAccess = localStorage.getItem('fullAccess')
      const userId = localStorage.getItem('userId')
      if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
        this.formSettingService.isheading = false;
        this.formSettingService.typeForm = 'резюме';
        this.settingHeaderService.post = false;
        this.settingHeaderService.shared = false;
        this.router.navigate([`/myaccount/${userId}/newResume`]);
      } else {
        this.popUpErrorCreateService.visible = true;
      }
    } else {
      this.popUpEntryService.showDialog();
    }
  }

  handlePostVacancy() {
    if (this.tokenService.getToken()) {
      const fullAccess = localStorage.getItem('fullAccess')
      const userId = localStorage.getItem('userId')
      if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
        this.formSettingService.isheading = false;
        this.formSettingService.typeForm = 'вакансии';
        this.settingHeaderService.post = false;
        this.settingHeaderService.shared = false;
        this.router.navigate([`/myaccount/${userId}/newVacancy`]);
      } else {
        this.popUpErrorCreateService.visible = true;
      }
    } else {
      this.popUpEntryService.showDialog();
    }
  }
}
