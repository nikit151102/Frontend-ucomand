import { Component } from '@angular/core';
import { BackgroundImgsComponent } from '../../../background-imgs/background-imgs.component';
import { TokenService } from '../../../token.service';
import { PopUpEntryService } from '../../../pop-up-entry/pop-up-entry.service';
import { SettingHeaderService } from '../../../setting-header.service';
import { FormSettingService } from '../../../form/form-setting.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

  handlePostResume() {
    if (this.tokenService.getToken()) {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      const userId = localStorage.getItem('userId')
      this.router.navigate([`/myaccount/${userId}/newResume`]);
    }else{
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
    }else{
      this.popUpEntryService.showDialog();
    }
  }
}
