import { Component, OnInit } from '@angular/core';
import { CardVacancyComponent } from '../card-vacancy/card-vacancy.component';
import { CommonModule } from '@angular/common';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';
import { SearchComponent } from './search/search.component';
import { SortetdFilterComponent } from './sortetd-filter/sortetd-filter.component';
import { ViewCardService } from '../view-card/view-card.service';
import { Router } from '@angular/router';
import { SettingHeaderService } from '../setting-header.service';
import { CardResumeComponent } from '../card-resume/card-resume.component';
import { HomeService } from './home.service';
import { OneSectionComponent } from './one-section/one-section.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchInputPhoneComponent } from './search/search-input-phone/search-input-phone.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OneSectionComponent, BackgroundImgsComponent, SearchComponent, CardVacancyComponent, SortetdFilterComponent, CardResumeComponent, SearchInputPhoneComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

  constructor(
    private viewCardService: ViewCardService, 
    public settingHeaderService: SettingHeaderService, 
    private router: Router, 
    public homeService: HomeService
  ) {
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;
    this.settingHeaderService.backbtn = false;
  }

  ngOnInit() {
    this.homeService.loadData();
  }

  

  viewCard(cardValue: any, type: string, route: string) {
    this.viewCardService.selectedCard = cardValue;
    this.viewCardService.typeCard = type;

    localStorage.setItem('routeTypeCard', type);
    this.router.navigate([`/${route}`, cardValue]);

    this.homeService.loadData();
  }
  
  getCardUrl(cardValue: any, type: string, route: string): string {
    return this.router.createUrlTree([route, cardValue]).toString();
  }
  
}
