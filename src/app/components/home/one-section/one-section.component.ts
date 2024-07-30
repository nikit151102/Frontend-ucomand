import { Component } from '@angular/core';
import { BackgroundImgsAboutUsComponent } from '../../about-us/background-imgs/background-imgs.component';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import { FormSettingService } from '../../form/form-setting.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-section',
  standalone: true,
  imports: [CommonModule, BackgroundImgsAboutUsComponent,SearchComponent],
  templateUrl: './one-section.component.html',
  styleUrl: './one-section.component.css'
})
export class OneSectionComponent {

  
  constructor(private formSettingService: FormSettingService, private router: Router){}

  tagsList = ['Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных',
    'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор','Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор']
    
  newVacancy() {
    this.formSettingService.isheading = true;
    this.formSettingService.typeForm = 'вакансии';
    this.router.navigate([`/newVacancy`]);
  }

  newResume() {
    this.formSettingService.isheading = false;
    this.formSettingService.typeForm = 'резюме';
    this.router.navigate([`/newResume`]);
  }


}
