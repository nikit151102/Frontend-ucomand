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
import { SettingHeaderService } from '../../setting-header.service';
import { TokenService } from '../../token.service';
import { throttle } from 'lodash';

@Component({
  selector: 'app-one-section',
  standalone: true,
  imports: [CommonModule, BackgroundImgsComponent, SearchComponent, DesktopTypeComponent, PhoneTypeComponent, ToggleSwitchComponent],
  templateUrl: './one-section.component.html',
  styleUrl: './one-section.component.css'
})

export class OneSectionComponent implements AfterViewInit {

  constructor(public settingHeaderService: SettingHeaderService, private formSettingService: FormSettingService, public tokenService:TokenService, private router: Router, public popUpEntryService: PopUpEntryService) { }

  hasType = false;

  private stickyOffset: number = 60; 
  private searchElement: HTMLElement | null = null;
  private fixedPixel: number = 0;
  private isStickyApplied: boolean = false;

  ngAfterViewInit() {
    this.hasType = !!document.querySelector('app-desktop-type') || !!document.querySelector('app-phone-type');
    this.searchElement = document.querySelector('app-search');
    this.onWindowScroll(); 
  }

  
  handleScroll = throttle(() => {
    if (this.searchElement) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementRect = this.searchElement.getBoundingClientRect();
      const elementTop = scrollTop + elementRect.top;
  
      const shouldApplySticky = scrollTop >= (elementTop - this.stickyOffset) && (scrollTop > this.fixedPixel);
  
      if (shouldApplySticky && !this.isStickyApplied) {
        console.log("add('sticky')");
        this.searchElement.classList.add('sticky');
        this.fixedPixel = scrollTop;
        this.settingHeaderService.isSticky = true;
        this.isStickyApplied = true;
      } else if (!shouldApplySticky && this.isStickyApplied) {
        console.log("remove('sticky');");
        this.searchElement.classList.remove('sticky');
        this.fixedPixel = 0;
        this.settingHeaderService.isSticky = false;
        this.isStickyApplied = false;
      }
    }
  }, 200);
  
  private scrollScheduled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.scrollScheduled) {
      this.scrollScheduled = true;
      requestAnimationFrame(() => {
        this.handleScroll();
        this.scrollScheduled = false; 
      });
    }
  }

  
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
