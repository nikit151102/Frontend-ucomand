import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
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

  constructor(public settingHeaderService: SettingHeaderService, 
    private elRef: ElementRef,  private cdr: ChangeDetectorRef,
    private renderer: Renderer2,private formSettingService: FormSettingService, public tokenService:TokenService, private router: Router, public popUpEntryService: PopUpEntryService) { }

  private stickyOffset: number = 60; 
  private searchElement: HTMLElement | null = null;
  private isStickyApplied: boolean = false;

  ngAfterViewInit() {
    this.cdr.detectChanges();
  this.searchElement = this.elRef.nativeElement.querySelector('app-search');
  this.startScrollMonitoring();
  }

  private startScrollMonitoring() {
    const checkSticky = () => {
      if (this.searchElement) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const elementRect = this.searchElement.getBoundingClientRect();
        const elementTop = scrollTop + elementRect.top;

        const shouldApplySticky = scrollTop >= (elementTop - this.stickyOffset);

        if (shouldApplySticky && !this.isStickyApplied) {
          this.renderer.addClass(this.searchElement, 'sticky');
          this.settingHeaderService.isSticky = true;
          this.isStickyApplied = true;
        } else if (!shouldApplySticky && this.isStickyApplied) {
          this.renderer.removeClass(this.searchElement, 'sticky');
          this.settingHeaderService.isSticky = false;
          this.isStickyApplied = false;
        }
      }
      requestAnimationFrame(checkSticky); 
    };

    requestAnimationFrame(checkSticky);
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
