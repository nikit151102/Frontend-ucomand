import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SortingComponent {

  constructor(private homeService:HomeService){}

  @ViewChild('dropdown') dropdown!: ElementRef;

  isDropdownVisible = false;
  activeLink: string = 'Сначала новые';

  ngOnInit(): void {}

  toggle(event: Event) {
    this.isDropdownVisible = !this.isDropdownVisible;
    event.stopPropagation(); 
  }

  setActive(link: string) {
    if(this.activeLink !== link){
      this.activeLink = link;
    if(this.activeLink=='Сначала новые'){
      this.homeService.toggleSort('creationDate_desc');
    }else{
      this.homeService.toggleSort('creationDate');
    }
    
    }
    this.isDropdownVisible = false; 
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
