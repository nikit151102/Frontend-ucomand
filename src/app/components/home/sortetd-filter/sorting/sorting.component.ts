import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SortingComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  isDropdownVisible = false;
  activeLink: string = 'Сначала новые';

  ngOnInit(): void {}

  toggle(event: Event) {
    this.isDropdownVisible = !this.isDropdownVisible;
    event.stopPropagation(); // Останавливаем всплытие события клика
  }

  setActive(link: string) {
    this.activeLink = link;
    this.isDropdownVisible = false; // Закрываем меню после выбора
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isDropdownVisible && this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }
}
