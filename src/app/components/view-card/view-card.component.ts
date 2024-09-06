import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { TokenService } from '../token.service';
import { DomainService } from '../domain.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ResumeComponent } from './resume/resume.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeService } from '../personal-account/services/resume.service';
import { PageErrorComponent } from '../page-error/page-error.component';
import { ErrorViewCardComponent } from './error-view-card/error-view-card.component';
import { SkeletCardComponent } from '../skelet-card/skelet-card.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, SkeletonModule, VacancyComponent, ResumeComponent, SkeletonModule, PageErrorComponent, ErrorViewCardComponent, SkeletCardComponent],
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ViewCardComponent implements OnInit {

  imagePath: string = '';
  domainName: string = '';
  visibleCard: boolean = false;
  visibleError: boolean = false;
  dataCard: any;
  typeCard: any;
  currentUser: any;
  numberError!: number;
  routeName: string = '';

  constructor(
    public viewCardService: ViewCardService,
    private settingHeaderService: SettingHeaderService,
    private router: Router,
    public tokenService: TokenService,
    private domainService: DomainService,
    private popUpEntryService: PopUpEntryService,
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private homeService: HomeService
  ) {
    this.visibleError = true;
    this.route.data.subscribe(data => {
      this.routeName = data['routeName'];
      console.log('Route Name:', this.routeName);
    });
  }

  background: string = '';



  private applyTheme(theme: string) {
    if (theme === 'dark') {
      this.background = '#3a3a3a';
    } else {
      this.background = '#e0e0e0';
    }
  }

  ngOnInit(): void {
    this.homeService.activeTheme$.subscribe(theme => {
      this.applyTheme(theme);
    });

    this.typeCard = localStorage.getItem('routeTypeCard');
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.viewCardService.getCardData(id).subscribe(
        (data) => {

          setTimeout(() => {
            this.dataCard = data;
          }, 1000);
          this.visibleCard = true;
          this.visibleError = false;
          this.domainName = this.domainService.setDomain(this.dataCard.user.freeLink);
          this.domainService.checkImageExists(this.domainName).then((path) => {
            this.imagePath = path;
          });
          this.viewCardService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            console.log("user", user)
          });
        },
        (error) => {
          if (error.status == 404) {
            this.visibleCard = false;
            this.visibleError = false;
            this.settingHeaderService.isheader = false;
            this.settingHeaderService.isFooter = false;
            this.numberError = error.status;
          } else {
            this.visibleCard = false;
            this.visibleError = true;
            this.numberError = error.status;
            this.router.navigate(['/error', { num: error.status }]);
          }
          console.error('Ошибка при загрузке данных:', error);
        }
      );
    });
  }

  viewUser() {
    this.router.navigate([`/user`, this.dataCard.user.id]);
  }

  enter() {
    this.popUpEntryService.showDialog();
  }

  setArchive(event: Event) {
    event.stopPropagation();
    this.resumeService.toggleResumeArchive(this.dataCard);
    this.router.navigate([`/myaccount`, this.dataCard.user.id]);
  }

}
