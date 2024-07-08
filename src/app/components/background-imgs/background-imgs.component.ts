import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormSettingService } from '../form/form-setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background-imgs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-imgs.component.html',
  styleUrl: './background-imgs.component.css'
})
export class BackgroundImgsComponent {
  tagsList = ['Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных',
    'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор']

  constructor(private formSettingService: FormSettingService, private router: Router){}

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
