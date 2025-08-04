import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';
import { SearchComponent } from './search/search.component';
import { SortetdFilterComponent } from './sortetd-filter/sortetd-filter.component';
import { ViewCardService } from '../view-card/view-card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeaderService } from '../setting-header.service';
import { HomeService } from './home.service';
import { OneSectionComponent } from './one-section/one-section.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchInputPhoneComponent } from './search/search-input-phone/search-input-phone.component';
import { ResumeLibraryComponent, VacancyLibraryComponent } from '../../../common-uteam-library';
import { ProjectComponent } from './project/project.component';
import { HackathonCadComponent } from './hackathon-cad/hackathon-cad.component';
import { HttpClient } from '@angular/common/http';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { environment } from '../../../environment';
import { TokenService } from '../token.service';
import { PopUpEntryComponent } from '../pop-up-entry/pop-up-entry.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OneSectionComponent, BackgroundImgsComponent, SearchComponent, SortetdFilterComponent, SearchInputPhoneComponent, VacancyLibraryComponent, ResumeLibraryComponent, ProjectComponent, HackathonCadComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PopUpEntryComponent],
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
export class HomeComponent implements OnInit {

  loading: boolean = true;
  isVisibleFilter: boolean = false;

  isDesktop = false;
  isTablet = false;
  isMobile = false;
  resumeVisibleSections: string[] = ['profession', 'availability', 'skills', 'motivations', 'profile']

  constructor(
    private viewCardService: ViewCardService,
    public settingHeaderService: SettingHeaderService,
    private router: Router,
    public homeService: HomeService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService,
    private popUpEntryService: PopUpEntryService,
    private popUpEntryComponent:PopUpEntryComponent
  ) {

    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.settingHeaderService.backbtn = false;
  }

  userId!: number;
  ngOnInit() {
    this.settingHeaderService.isFilterState$.subscribe(value => {
      this.isVisibleFilter = value;
    });
    this.homeService.loadData();
    this.updateView(window.innerWidth);

    this.route.params.subscribe(params => {
      this.userId = +params['idUser'];
      this.verifyProfile();
    });

  }

  verifyProfile(): void {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/auth/token/${this.userId}`)
      .subscribe({
        next: (response: any) => {
          this.loading = false;

          // Успешное подтверждение (200)
          this.popUpEntryService.confirmAuth = true;
          this.popUpEntryService.accessVerificationMessage = "Аккаунт успешно подтвержден"
          this.popUpEntryService.showDialog();
          // this.tokenService.setToken(response.token);
          // localStorage.setItem('userNickname', response.nickname);
          this.popUpEntryComponent.login_user();
        },
        error: (error) => {
          this.loading = false;

          if (error.status === 208) {  // Уже подтвержден
            this.popUpEntryService.accessVerificationMessage = "Аккаунт уже подтвержден ранее";
            this.popUpEntryService.showDialog();
          }
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateView(event.target.innerWidth);
  }

  updateView(width: number): void {
    if (width >= 1024) {
      this.isDesktop = true;
      this.isTablet = false;
      this.isMobile = false;
    } else if (width >= 768 && width < 1024) {
      this.isDesktop = false;
      this.isTablet = true;
      this.isMobile = false;
    } else {
      this.isDesktop = false;
      this.isTablet = false;
      this.isMobile = true;
    }
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


  nextPage() {
    this.homeService.nextPage()
  }
}
