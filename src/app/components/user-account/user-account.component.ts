import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CardPersonalResumeComponent } from './card-personal-resume/card-personal-resume.component';
import { CardPersonalVacancyComponent } from './card-personal-vacancy/card-personal-vacancy.component';
import { SettingHeaderService } from '../setting-header.service';
import { ViewCardService } from '../view-card/view-card.service';
import { DomainService } from '../domain.service';
import { UserAccountService } from './user-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { HomeService } from '../home/home.service';
import { TokenService } from '../token.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, CardPersonalResumeComponent, CardPersonalVacancyComponent, SkeletonModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})

export class UserAccountComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private settingHeaderService: SettingHeaderService, public viewCardService: ViewCardService,
    public domainService: DomainService, private userAccountService: UserAccountService,
    private router: Router, private homeService: HomeService, private popUpEntryService: PopUpEntryService,
    public tokenService: TokenService) {
    this.settingHeaderService.shared = true;
  }

  userId: string = '';
  userData: any = '';
  vacancies: any;
  resumes: any;
  background: string = '';
  imagePath: string = '';
  domainName: string = '';

  async ngOnInit(): Promise<void> {

    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
    console.log('userAccount')
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      if (this.userId) {
        this.loadData(this.userId);
      } else {
      }
    });
    
  }

loadData(id: string): void {
    this.userAccountService.getUserData(id).subscribe(
      async (userData) => {
        this.userData = userData;
        
        if (userData.freeLink) {
          this.domainName = this.domainService.setDomain(userData.freeLink);
  
          this.imagePath = await this.domainService.checkImageExists(this.domainName);
        }
  
        this.userAccountService.getVacanciesData(this.userData.id).subscribe(
          (vacancies) => {
            this.vacancies = vacancies;
          },
          (error) => {
            console.error('Error while fetching vacancies:', error);
          }
        );
  
        this.userAccountService.getResumessData(this.userData.id).subscribe(
          (resumes) => {
            this.resumes = resumes;
          },
          (error) => {
            console.error('Error while fetching resumes:', error);
          }
        );
      },
      (error) => {
        console.log('error.status',error)
        if(this.userId == localStorage.getItem('userNickname')) {
          localStorage.removeItem('userNickname');
          localStorage.removeItem('authToken');
          localStorage.removeItem('fullAccess');
        }
        if (error.status) {
          this.router.navigate(['/error', error.status.toString()]);
        } else {
          this.router.navigate(['/error', { num: "500" }]);
        }
      }
    );
  }


  ngOnDestroy(): void {
    this.userAccountService.unsubscribe();
  }


  enter() {
    this.popUpEntryService.showDialog();
  }

  getCardUrl(cardValue: any, type: string, route: string): string {
    localStorage.setItem('routeTypeCard', type);
    return this.router.createUrlTree([route, cardValue]).toString();
  }


  onCardClick(event: MouseEvent, cardId: any, type: string): void {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.router.navigate([`/${type}`, cardId]);
  }
  
}
