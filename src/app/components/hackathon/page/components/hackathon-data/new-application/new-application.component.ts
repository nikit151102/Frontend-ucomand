import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectComponent } from './project/project.component';
import { FormSettingService } from '../../../../../form/form-setting.service';
import { SettingHeaderService } from '../../../../../setting-header.service';
import { Router } from '@angular/router';
import { PopUpErrorCreateService } from '../../../../../pop-up-error-create/pop-up-error-create.service';
import { ResumePersonComponent } from './resume-person/resume-person.component';

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ResumePersonComponent],
  templateUrl: './new-application.component.html',
  styleUrl: './new-application.component.css'
})
export class NewApplicationComponent {

  isPopupOpen = false;
  isPopupsSuccessOpen = false;

  constructor(private formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private router: Router,
    private popUpErrorCreateService: PopUpErrorCreateService,
  ) { }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  openPopupSuccess() {
    this.isPopupsSuccessOpen = true;
    this.isPopupOpen = false;
  }

  closePopupSuccess() {
    this.isPopupsSuccessOpen = false;
    this.isPopupOpen = false;
  }

  handlePostProject(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userNickname = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/${userNickname}/account/newProject`]);
    } else {
      this.popUpErrorCreateService.visible = true;
    }
  }


}