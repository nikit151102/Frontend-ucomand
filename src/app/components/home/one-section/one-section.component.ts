import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
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

export class OneSectionComponent {

  constructor(public settingHeaderService: SettingHeaderService, private formSettingService: FormSettingService,
    public tokenService: TokenService, private router: Router, public popUpEntryService: PopUpEntryService,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef) { }
    
    showTypes: boolean = true;

  ngAfterViewInit() {
    this.onWindowScroll();
  }

  private stickyOffset: number = 60;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const searchElement = this.elRef.nativeElement.querySelector('app-search');
    if (searchElement) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementRect = searchElement.getBoundingClientRect();
      const elementTop = scrollTop + elementRect.top;

      if (scrollTop >= (elementTop - this.stickyOffset)) {
        searchElement.classList.add('sticky');
        this.settingHeaderService.isSticky = true;
        if(this.showTypes){
          window.scrollTo(0, 0);
        }
        this.showTypes = false;
        
        const element = this.elRef.nativeElement.querySelector('.content');
        if (element) {
          element.style.marginBottom = '90px';

        }
      }
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
