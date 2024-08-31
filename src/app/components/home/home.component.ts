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


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, OneSectionComponent, BackgroundImgsComponent, SearchComponent, CardVacancyComponent, SortetdFilterComponent, CardResumeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    constructor(private viewCardService: ViewCardService, public settingHeaderService: SettingHeaderService, private router: Router, public homeService: HomeService) {
        this.settingHeaderService.post = false;
        this.settingHeaderService.shared = false;
        this.settingHeaderService.backbtn = false;
    }

    vacancies: any[] = [];
    resumes: any[] = [];


    ngOnInit(): void {
        this.homeService.getCardData('vacancies').subscribe(data => {
          this.vacancies = data; 
          console.log('Vacancies:', this.vacancies);
        });
    
        this.homeService.getCardData('resumes').subscribe(data => {
          this.resumes = data; 
          console.log('Resumes:', this.resumes); 
        });
      }

  

    viewCard(cardValue: any, type: string, route: string) {
        this.viewCardService.selectedCard = cardValue;
        this.viewCardService.typeCard = type;
        localStorage.setItem('routeTypeCard', type);
        this.router.navigate([`/${route}`, cardValue]);
    
    }


}
