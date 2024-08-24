import { AfterViewInit, Component, HostListener } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import { FormSettingService } from '../../form/form-setting.service';
import { CommonModule } from '@angular/common';
import { BackgroundImgsComponent } from '../../background-imgs/background-imgs.component';
import { DesktopTypeComponent } from './desktop-type/desktop-type.component';
import { PhoneTypeComponent } from './phone-type/phone-type.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { PopUpEntryService } from '../../pop-up-entry/pop-up-entry.service';

@Component({
  selector: 'app-one-section',
  standalone: true,
  imports: [CommonModule, BackgroundImgsComponent, SearchComponent, DesktopTypeComponent, PhoneTypeComponent, ToggleSwitchComponent],
  templateUrl: './one-section.component.html',
  styleUrl: './one-section.component.css'
})

export class OneSectionComponent implements AfterViewInit {

  hasType = false;

  private stickyOffset: number = 60; // Значение отступа для приклеивания
  private searchElement: HTMLElement | null = null;
  private fixedPixel: number = 0;

  ngAfterViewInit() {
    this.hasType = !!document.querySelector('app-desktop-type') || !!document.querySelector('app-phone-type');
    this.searchElement = document.querySelector('.search');
    this.onWindowScroll(); // Инициализируем состояние при загрузке
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.searchElement) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementRect = this.searchElement.getBoundingClientRect();
      const elementTop = scrollTop + elementRect.top;

      if (scrollTop >= (elementTop - this.stickyOffset) && (scrollTop > this.fixedPixel)) {
        if (!this.searchElement.classList.contains('sticky')) {
          this.searchElement.classList.add('sticky');
          this.fixedPixel = scrollTop;
          console.log('Adding sticky class');
        }
      } else {
        if (this.searchElement.classList.contains('sticky')) {
          this.searchElement.classList.remove('sticky');
          console.log('Removing sticky class');
          this.fixedPixel = 0;
        }
      }
    }
  }



  constructor(private formSettingService: FormSettingService, private router: Router, public popUpEntryService: PopUpEntryService) { }

  tagsList = ['Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных',
    'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор', 'Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор',
    'Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных',
    'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор', 'Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор',
    'Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор', 'Архитектор баз данных',
    'Системный аналитик', 'Арт директор', 'Арт директор', 'Арт директор', 'Арт директор', 'Веб дизайнер', '3d моделлер', 'Архитектор баз данных', 'Арт директор']

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
