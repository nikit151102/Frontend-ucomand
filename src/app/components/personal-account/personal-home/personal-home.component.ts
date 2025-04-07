import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingHeaderService } from '../../setting-header.service';
import { ArchiveResumeComponent } from '../archive-resume/archive-resume.component';
import { ArchiveVacancyComponent } from '../archive-vacancy/archive-vacancy.component';
import { PersonalResumeComponent } from '../resume/resume.component';
import { PersonalVacancyComponent } from '../vacancy/vacancy.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { DomainService } from '../../domain.service';
import { PersonalDataService } from '../personal-data/personal-data.service';
import { ViewCardService } from '../../view-card/view-card.service';
import { PersonalHomeService } from './personal-home.service';
import { catchError, forkJoin, Subscription } from 'rxjs';
import { PopUpDeleteComponent } from '../../pop-up-delete/pop-up-delete.component';
import { PopUpDeleteService } from '../../pop-up-delete/pop-up-delete.service';
import { PopUpExitService } from '../../pop-up-exit/pop-up-exit.service';
import { PopUpExitComponent } from '../../pop-up-exit/pop-up-exit.component';
import { ResumeService } from '../services/resume.service';
import { VacancyService } from '../services/vacancy.service';
import { FormSettingService } from '../../form/form-setting.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopUpErrorCreateService } from '../../pop-up-error-create/pop-up-error-create.service';
import { TokenService } from '../../token.service';
import { BanResumeComponent } from '../ban-resume/ban-resume.component';
import { BanVacancyComponent } from '../ban-vacancy/ban-vacancy.component';
import { PersonalProjectComponent } from '../personal-project/personal-project.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-personal-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PersonalVacancyComponent, PersonalResumeComponent, ArchiveResumeComponent, ArchiveVacancyComponent, PopUpDeleteComponent, PopUpExitComponent, BanResumeComponent, BanVacancyComponent, PersonalProjectComponent],
  templateUrl: './personal-home.component.html',
  styleUrl: './personal-home.component.css',
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
export class PersonalHomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private subscriptionExit: Subscription = new Subscription();
  isPopupVisible: boolean = false;
  isExitPopupVisible: boolean = false;

  constructor(private settingHeaderService: SettingHeaderService, private router: Router,
    private route: ActivatedRoute, public domainService: DomainService,
    public viewCardService: ViewCardService, private personalDataService: PersonalDataService,
    private personalHomeService: PersonalHomeService, private popUpDeleteService: PopUpDeleteService, public popUpExitService: PopUpExitService,
    public resumeService: ResumeService, public vacancyService: VacancyService, public tokenService: TokenService,
    private formSettingService: FormSettingService,
    public projectService: ProjectService,
    private popUpErrorCreateService: PopUpErrorCreateService) { }

  imagePath: string = '';
  domainName: string = '';
  dataCurrentUser: any = '';
  isDataComplete: boolean = true;
  visiblePage: boolean = false;
  vacanciesData: any;
  resumesData: any;
  favicon: any;
  showAllResume: boolean = false;
  itemsToShowResume: number = 3;
  toggleResumes() {
    this.showAllResume = !this.showAllResume;
    this.itemsToShowResume = this.showAllResume ? Infinity : 3;
  }

  showAllArchiveResume: boolean = false;
  itemsToShowArchiveResume: number = 3;
  toggleArchiveResumes() {
    this.showAllArchiveResume = !this.showAllArchiveResume;
    this.itemsToShowArchiveResume = this.showAllArchiveResume ? Infinity : 3;
  }

  showAllVacancies: boolean = false;
  itemsToShowVacancies: number = 3;
  toggleVacancies() {
    this.showAllVacancies = !this.showAllVacancies;
    this.itemsToShowVacancies = this.showAllVacancies ? Infinity : 3;
  }

  showAllArchiveVacancies: boolean = false;
  itemsToShowArchiveVacancies: number = 3;
  toggleArchiveVacancies() {
    this.showAllArchiveVacancies = !this.showAllArchiveVacancies;
    this.itemsToShowArchiveVacancies = this.showAllArchiveVacancies ? Infinity : 3;
  }

  showAllArchiveProjects: boolean = false;
  itemsToShowArchiveProjects: number = 3;
  toggleArchiveProjects() {
    this.showAllArchiveProjects = !this.showAllArchiveProjects;
    this.itemsToShowArchiveProjects = this.showAllArchiveProjects ? Infinity : 3;
  }

  showAllProjects: boolean = false;
  itemsToShowProjects: number = 3;
  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
    this.itemsToShowProjects = this.showAllProjects ? Infinity : 3;
  }

  ngOnInit(): void {
    this.settingHeaderService.shared = false;
    this.settingHeaderService.post = false;
    this.settingHeaderService.backbtn = true;

    this.resumeService.subscribeToGetCardsData();
    this.vacancyService.subscribeToGetCardsData();
    this.projectService.subscribeToGetCardsData();
    this.domainService.checkImageExists(this.domainName).then((path) => {
      this.imagePath = path;

    });
    this.subscription.add(
      this.popUpDeleteService.visible$.subscribe(visible => {
        this.isPopupVisible = visible;
      })
    );
    this.subscriptionExit.add(
      this.popUpExitService.visible$.subscribe(visible => {
        this.isExitPopupVisible = visible;
      })
    );

    forkJoin({
      user: this.personalDataService.getCurrentUser().pipe(
        catchError(error => {
          this.tokenService.clearToken();
          localStorage.removeItem('Linkken');
          localStorage.removeItem('fullAccess');
          localStorage.removeItem('userNickname');
          this.router.navigate(['/']);
          return [];
        })
      ),
      vacancies: this.personalHomeService.getCardsData("vacancies").pipe(
        catchError(error => {
          return [];
        })
      ),
      resumes: this.personalHomeService.getCardsData("resumes").pipe(
        catchError(error => {
          return [];
        })
      )
    }).subscribe(
      ({ user, vacancies, resumes }) => {
        if (user && user.nickname && user.id) {
          this.dataCurrentUser = user;
          this.vacanciesData = vacancies;
          this.resumesData = resumes;
          this.checkUserData();
          this.visiblePage = true;
          this.domainName = this.domainService.setDomainWithZone(user.freeLink);

          if (user.banned == false) {
            localStorage.setItem('USaccess', 'we26b502b2fe32e69046810717534b32d');
          } else {
            localStorage.setItem('USaccess', 'b326b5062b2f0e69046810717534cb09');
          }
        } else {
          localStorage.removeItem('userNickname');
          localStorage.removeItem('authToken');
          localStorage.removeItem('fullAccess');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
        this.tokenService.clearToken();
        localStorage.removeItem('Linkken');
        localStorage.removeItem('fullAccess');
        localStorage.removeItem('userNickname');
        localStorage.removeItem('userId');
        this.router.navigate(['/']);
      }
    );

  }

  checkUserData(): void {
    const { firstName, lastName, gender, age, freeLink, ownLink, aboutMe, cityOfResidence } = this.dataCurrentUser;
    this.isDataComplete = !!(firstName && lastName);
  }

  getRouting() {
    this.router.navigate(['../personalData'], { relativeTo: this.route });
  }

  deleteUser(): void {
    this.popUpDeleteService.showPopup();
  }

  exitAccount() {
    this.popUpExitService.showPopup();
  }

  ngOnDestroy(): void {
    this.isExitPopupVisible = false;
    this.isPopupVisible = false;
    this.popUpDeleteService.hidePopup();
    this.popUpExitService.hidePopup();
    this.resumeService.unsubscribeFromGetCardsData();
    this.vacancyService.unsubscribeFromGetCardsData();
    this.subscription.unsubscribe();
  }

  filterVacancies(type: string): any[] {
    return this.vacanciesData.filter((vacancy: any) => vacancy.visibility == type);
  }

  handlePostResume(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userNickname = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/${userNickname}/account/newResume`]);
    } else {
      this.popUpErrorCreateService.visible = true;
    }
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



  getCardUrl(cardValue: any, type: string, route: string): string {
    localStorage.setItem('routeTypeCard', type);
    return this.router.createUrlTree([route, cardValue]).toString();
  }

  getProjectUrl(cardValue: any): string {
    return this.router.createUrlTree(['project', cardValue]).toString();
  }

  onProjecClick(event: MouseEvent, cardId: any): void {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.router.navigate([`/project`, cardId]);
  }


  onCardClick(event: MouseEvent, cardId: any, type: string): void {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.router.navigate([`/${type}`, cardId]);
  }

  handlePostVacancy(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userNickname = localStorage.getItem('userNickname')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'вакансии';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/${userNickname}/account/newVacancy`]);
    } else {
      this.popUpErrorCreateService.visible = true;
    }
  }

  background: string = '';

  private applyTheme(theme: string) {
    if (theme === 'dark') {
      this.background = '#3a3a3a';
    } else {
      this.background = '#e0e0e0';
    }
  }


}
