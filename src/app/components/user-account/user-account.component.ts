import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardPersonalResumeComponent } from './card-personal-resume/card-personal-resume.component';
import { CardPersonalVacancyComponent } from './card-personal-vacancy/card-personal-vacancy.component';
import { SettingHeaderService } from '../setting-header.service';
import { ViewCardService } from '../view-card/view-card.service';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, CardPersonalResumeComponent, CardPersonalVacancyComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {

  constructor(private settingHeaderService: SettingHeaderService, public viewCardService: ViewCardService, private domainService: DomainService){
    this.settingHeaderService.shared = true;
  }

  imagePath: string = '';
  domainName: string = '';
  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
    const urlString = this.viewCardService.selectedUser.url;
    this.domainName = this.domainService.setDomain(urlString);
    console.log("property", this.domainName)
    this.domainService.checkImageExists(this.domainName).then((path) => {
      this.imagePath = path;
    });
  }
}
