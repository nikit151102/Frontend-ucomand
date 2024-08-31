import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardPersonalResumeComponent } from './card-personal-resume/card-personal-resume.component';
import { CardPersonalVacancyComponent } from './card-personal-vacancy/card-personal-vacancy.component';
import { SettingHeaderService } from '../setting-header.service';
import { ViewCardService } from '../view-card/view-card.service';
import { DomainService } from '../domain.service';
import { UserAccountService } from './user-account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, CardPersonalResumeComponent, CardPersonalVacancyComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})

export class UserAccountComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private settingHeaderService: SettingHeaderService, public viewCardService: ViewCardService, private domainService: DomainService, private userAccountService: UserAccountService) {
    this.settingHeaderService.shared = true;
  }

  userId: string = '';
  userData: any;
  vacancies: any;
  resumes: any;

  imagePath: string = '';
  domainName: string = '';

  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      if (this.userId) {
        this.loadData(this.userId);
        console.log("vacancies", this.vacancies)
        console.log("resumes", this.resumes)
      }
    });
  }


  loadData(id: string): void {
    // this.userAccountService.subscribeToObservable(
    //   this.userAccountService.getUserData(id),
    //   data => {
    //     this.userData = data

    //     this.domainName = this.domainService.setDomain(data.);

    //     this.domainService.checkImageExists(this.domainName).then((path) => {
    //       this.imagePath = path;
    //     });
    //   }
    // );

    this.userAccountService.subscribeToObservable(
      this.userAccountService.getVacanciesData(id),
      data => this.vacancies = data
    );

    this.userAccountService.subscribeToObservable(
      this.userAccountService.getResumessData(id),
      data => this.resumes = data
    );


  }

  ngOnDestroy(): void {
    this.userAccountService.unsubscribe();
  }



}
