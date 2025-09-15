import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { OneSectionComponent } from './sections/one-section/one-section.component';
import { ThirdSectionComponent } from './sections/third-section/third-section.component';
import { FourthSectionComponent } from "./sections/fourth-section/fourth-section.component";
import { FifthSectionComponent } from "./sections/fifth-section/fifth-section.component";
import { TwoSectionComponent } from './sections/two-section/two-section.component';
import { SixthSectionComponent } from "./sections/sixth-section/sixth-section.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-lending',
  standalone: true,
  imports: [OneSectionComponent, TwoSectionComponent, ThirdSectionComponent, 
    FourthSectionComponent, FifthSectionComponent, SixthSectionComponent, CommonModule],
  templateUrl: './public-lending.component.html',
  styleUrl: './public-lending.component.css'
})
export class PublicLendingComponent  implements AfterViewInit, OnDestroy {
 @ViewChildren('section') sections!: QueryList<ElementRef>;
  
  private isScrolling = false;
  currentSection = 0;
  private scrollTimeout: any;
  private wheelTimeout: any;
  private touchStartY = 0;
  private sectionsInitialized = false;
  private lastScrollTime = 0;
  private scrollCooldown = 3000; 

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.sections.changes.subscribe(() => {
      this.sectionsInitialized = true;
      setTimeout(() => {
        this.scrollToSection(0, false);
        this.cdRef.detectChanges();
      });
    });

    if (this.sections.length > 0) {
      this.sectionsInitialized = true;
      setTimeout(() => {
        this.scrollToSection(0, false);
        this.cdRef.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    
    if (this.isScrolling || Date.now() - this.lastScrollTime < this.scrollCooldown) return;
    
    const delta = Math.sign(event.deltaY);
    const now = Date.now();
    
    if (now - this.lastScrollTime > 500) { 
      if (delta > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
      this.lastScrollTime = now;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isScrolling || Date.now() - this.lastScrollTime < this.scrollCooldown) return;
    
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      this.nextSection();
      this.lastScrollTime = Date.now();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      this.previousSection();
      this.lastScrollTime = Date.now();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isScrolling) {
      window.scrollTo(0, this.currentSection * window.innerHeight);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.scrollToSection(this.currentSection, false);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.isScrolling || Date.now() - this.lastScrollTime < this.scrollCooldown) {
      event.preventDefault();
      return;
    }

    const touchEndY = event.touches[0].clientY;
    const diff = this.touchStartY - touchEndY;

    if (Math.abs(diff) > 100) {
      event.preventDefault();
      
      if (diff > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
      this.lastScrollTime = Date.now();
    }
  }

  scrollToSection(index: number, smooth: boolean = true) {
    if (!this.sectionsInitialized || !this.sections) return;
    if (this.isScrolling || index < 0 || index >= this.sections.length) return;

    this.isScrolling = true;
    this.currentSection = index;

    const targetPosition = index * window.innerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.cdRef.detectChanges();
    }, smooth ? 800 : 100);
  }

  nextSection() {
    if (this.sectionsInitialized && this.sections && this.currentSection < this.sections.length - 1) {
      this.scrollToSection(this.currentSection + 1);
    }
  }

  previousSection() {
    if (this.sectionsInitialized && this.sections && this.currentSection > 0) {
      this.scrollToSection(this.currentSection - 1);
    }
  }

  goToSection(index: number) {
    if (this.sectionsInitialized && this.sections) {
      this.scrollToSection(index);
    }
  }
}