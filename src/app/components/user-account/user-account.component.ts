import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CardPersonalResumeComponent } from './card-personal-resume/card-personal-resume.component';
import { CardPersonalVacancyComponent } from './card-personal-vacancy/card-personal-vacancy.component';
import { SettingHeaderService } from '../setting-header.service';
import { ViewCardService } from '../view-card/view-card.service';
import { DomainService } from '../domain.service';
import { UserAccountService } from './user-account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, CardPersonalResumeComponent, CardPersonalVacancyComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})

export class UserAccountComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private settingHeaderService: SettingHeaderService, public viewCardService: ViewCardService, 
    private domainService: DomainService, private userAccountService: UserAccountService,
    private cdRef: ChangeDetectorRef, 
    private router: Router  ) {
    this.settingHeaderService.shared = true;
  }

  userId: string = '';
  userData: any;
  vacancies: any;
  resumes: any;

  imagePath: string = '';
  domainName: string = '';

  async ngOnInit(): Promise<void> {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
 
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      if (this.userId) {
        this.loadData(this.userId);
      }
    });
  }
  
  async loadData(id: string): Promise<void> {
    try {
      const userData = await this.userAccountService.getUserData(id).toPromise();
      this.userData = userData;
      console.log("userData",this.userData)
      if (userData.freeLink) {
        this.domainName = this.domainService.setDomain(userData.freeLink);
        this.imagePath = await this.domainService.checkImageExists(this.domainName);
      }
      
      this.vacancies = await this.userAccountService.getVacanciesData(id).toPromise();
      this.resumes = await this.userAccountService.getResumessData(id).toPromise();
    } catch (error: any) {
     if (error.status) {
       this.router.navigate(['/error', { num: error.status }]);
     } else {
       this.router.navigate(['/error', { num: 500 }]);
     }
    }
  }
  
  

  ngOnDestroy(): void {
    this.userAccountService.unsubscribe();
  }



}
