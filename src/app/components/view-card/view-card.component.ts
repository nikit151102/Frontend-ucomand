import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeComponent } from './resume/resume.component';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, VacancyComponent, ResumeComponent],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent implements OnInit {

  constructor(public viewCardService: ViewCardService, 
    private settingHeaderService: SettingHeaderService, 
    private router: Router, 
    public tokenService: TokenService, 
    private domainService: DomainService) {
  }
  imagePath: string = '';

  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;

    const urlString = 'https://t/.me/username';
    const domainName = this.domainService.setDomain(urlString);
    console.log("domainName",domainName)
    this.domainService.checkImageExists(domainName).then((path) => {
      this.imagePath = path;
    });
  }

  cardItem: any;

  viewUser() {
    this.router.navigate([`/user`,'root']);
  }

  

}
