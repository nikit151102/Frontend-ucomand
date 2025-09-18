import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { OneSectionComponent } from './sections/one-section/one-section.component';
import { ThirdSectionComponent } from './sections/third-section/third-section.component';
import { FourthSectionComponent } from "./sections/fourth-section/fourth-section.component";
import { FifthSectionComponent } from "./sections/fifth-section/fifth-section.component";
import { TwoSectionComponent } from './sections/two-section/two-section.component';
import { SixthSectionComponent } from "./sections/sixth-section/sixth-section.component";
import { SeventhSectionComponent } from "./sections/seventh-section/seventh-section.component";
import { LendingFooterButtonComponent } from "./sections/lending-footer-button/lending-footer-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-lending',
  standalone: true,
  imports: [OneSectionComponent, TwoSectionComponent, ThirdSectionComponent, 
    FourthSectionComponent, FifthSectionComponent, SixthSectionComponent, CommonModule, SeventhSectionComponent],
  templateUrl: './public-lending.component.html',
  styleUrl: './public-lending.component.css'
})
export class PublicLendingComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  
  private isScrolling = false;
  currentSection = 0;
  private scrollTimeout: any;
  private sectionsInitialized = false;
  private lastScrollTime = 0;
  private scrollCooldown = 400; // Уменьшил время блокировки
  private isManualScroll = false;
  private touchStartY = 0;
  private wheelDeltaAccumulator = 0;
  private readonly wheelDeltaThreshold = 100; // Порог для активации скролла
  private resizeTimeout: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Блокируем стандартный скролл
    document.body.style.overflow = 'hidden';
    
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
    // Восстанавливаем стандартный скролл
    document.body.style.overflow = '';
    
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    // Всегда предотвращаем стандартное поведение
    event.preventDefault();
    
    // Блокируем скролл во время анимации
    if (this.isScrolling || Date.now() - this.lastScrollTime < this.scrollCooldown) {
      return;
    }
    
    // Накопление дельты для определения интенсивности скролла
    this.wheelDeltaAccumulator += Math.abs(event.deltaY);
    
    // Если не достигли порога - выходим
    if (this.wheelDeltaAccumulator < this.wheelDeltaThreshold) {
      return;
    }
    
    const delta = Math.sign(event.deltaY);
    
    if (delta > 0) {
      this.nextSection();
    } else {
      this.previousSection();
    }
    
    this.lastScrollTime = Date.now();
    this.wheelDeltaAccumulator = 0; // Сбрасываем аккумулятор
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
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.scrollToSection(0);
      this.lastScrollTime = Date.now();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.scrollToSection(this.sections.length - 1);
      this.lastScrollTime = Date.now();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Всегда предотвращаем стандартный скролл
    event.preventDefault();
    
    // Игнорируем события скролла, которые мы сами инициируем
    if (this.isManualScroll) {
      this.isManualScroll = false;
      return;
    }
    
    // Если скролл вызван не нами, принудительно возвращаем на текущую секцию
    if (!this.isScrolling) {
      this.scrollToSection(this.currentSection, false);
    }
  }

  @HostListener('window:resize')
  onResize() {
    // Добавляем задержку для избежания множественных вызовов при ресайзе
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.scrollToSection(this.currentSection, false);
    }, 250);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.isScrolling || Date.now() - this.lastScrollTime < this.scrollCooldown) {
      event.preventDefault();
      return;
    }
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

    // Высокий порог для тач-устройств
    if (Math.abs(diff) > 80) {
      event.preventDefault();
      
      if (diff > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
      this.lastScrollTime = Date.now();
      this.touchStartY = touchEndY; // Обновляем начальную позицию
    }
  }

  scrollToSection(index: number, smooth: boolean = true) {
    if (!this.sectionsInitialized || !this.sections) return;
    if (this.isScrolling || index < 0 || index >= this.sections.length) return;

    this.isScrolling = true;
    this.currentSection = index;
    this.isManualScroll = true;

    const targetPosition = index * window.innerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });

    // Время завершения скролла
    const scrollDuration = smooth ? 600 : 100;
    
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.cdRef.detectChanges();
    }, scrollDuration);
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