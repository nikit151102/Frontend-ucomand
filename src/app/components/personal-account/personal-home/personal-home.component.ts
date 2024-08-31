import { Component, OnInit } from '@angular/core';
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
import { User } from '../personal-data/user-interface';
import { PersonalHomeService } from './personal-home.service';
import { catchError, forkJoin, Subscription } from 'rxjs';
import { PopUpDeleteComponent } from '../../pop-up-delete/pop-up-delete.component';
import { PopUpDeleteService } from '../../pop-up-delete/pop-up-delete.service';
import { PopUpExitService } from '../../pop-up-exit/pop-up-exit.service';
import { PopUpExitComponent } from '../../pop-up-exit/pop-up-exit.component';
import { ResumeService } from '../services/resume.service';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-personal-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PersonalVacancyComponent, PersonalResumeComponent, ArchiveResumeComponent, ArchiveVacancyComponent, PopUpDeleteComponent, PopUpExitComponent],
  templateUrl: './personal-home.component.html',
  styleUrl: './personal-home.component.css'
})
export class PersonalHomeComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private subscriptionExit: Subscription = new Subscription();
  isPopupVisible: boolean = false;
  isExitPopupVisible: boolean = false;

  constructor(private settingHeaderService: SettingHeaderService, private router: Router,
    private route: ActivatedRoute, private domainService: DomainService,
    public viewCardService: ViewCardService, private personalDataService: PersonalDataService,
    private personalHomeService: PersonalHomeService, private popUpDeleteService: PopUpDeleteService, public popUpExitService: PopUpExitService,
    public resumeService: ResumeService, public vacancyService:VacancyService) { }

  imagePath: string = '';
  domainName: string = '';
  dataCurrentUser!: User;
  isDataComplete: boolean = true;
  visiblePage: boolean = false;
  vacanciesData: any;
  resumesData: any;

  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.post = true;
    this.settingHeaderService.backbtn = false;

    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
    const urlString = this.viewCardService.selectedUser.url;
    this.domainName = this.domainService.setDomain(urlString);
    console.log("property", this.domainName)

    this.resumeService.subscribeToGetCardsData();
    this.vacancyService.subscribeToGetCardsData();

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

    // Параллельное выполнение запросов
    forkJoin({
      user: this.personalDataService.getCurrentUser().pipe(
        catchError(error => {
          console.error('Ошибка при загрузке пользователя:', error);
          return [];
        })
      ),
      vacancies: this.personalHomeService.getCardsData("vacancies").pipe(
        catchError(error => {
          console.error('Ошибка при загрузке вакансий:', error);
          return [];
        })
      ),
      resumes: this.personalHomeService.getCardsData("resumes").pipe(
        catchError(error => {
          console.error('Ошибка при загрузке резюме:', error);
          return [];
        })
      )
    }).subscribe(
      ({ user, vacancies, resumes }) => {
        this.dataCurrentUser = user;
        this.vacanciesData = vacancies;
        this.resumesData = resumes;
        this.checkUserData();
        console.log("dataCurrentUser", this.dataCurrentUser)
        console.log("resumes", resumes)
        console.log("vacancies", vacancies)
        this.visiblePage = true;
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );

  }

  checkUserData(): void {
    const { firstName, lastName, gender, age, freeLink, ownLink, aboutMe, cityOfResidence } = this.dataCurrentUser;

    // Check if any field is missing or empty
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
    this.resumeService.unsubscribeFromGetCardsData();
    this.vacancyService.unsubscribeFromGetCardsData();
    this.subscription.unsubscribe();
  }

  filterVacancies(type: string): any[] {
    return this.vacanciesData.filter((vacancy: any) => vacancy.visibility == type);
  }



}
