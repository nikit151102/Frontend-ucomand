import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingHeaderService } from '../../../setting-header.service';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-search-input-phone',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-input-phone.component.html',
  styleUrl: './search-input-phone.component.css'
})
export class SearchInputPhoneComponent implements OnInit {

  constructor(
    public settingHeaderService: SettingHeaderService,
    private cdr: ChangeDetectorRef,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.loadFiltersFromLocalStorage();
  }
  private loadFiltersFromLocalStorage(): void {
    const filters = sessionStorage.getItem('bodyFilters');

    if (filters) {
      try {
        const parsedFilters = JSON.parse(filters);

        if (parsedFilters.searchText) {
          this.searchText = parsedFilters.genders;
        }

      } catch (error) {
        console.error('Ошибка при парсинге данных из localStorage:', error);
      }
    }
  }

  search() {
    const filters = sessionStorage.getItem('bodyFilters');
    let bodyFilters = filters ? JSON.parse(filters) : {};
  
    if (this.searchText.length > 0) {
      bodyFilters.searchText = this.searchText;
    } else {
      delete bodyFilters.searchText;
    }
    sessionStorage.setItem('bodyFilters', JSON.stringify(bodyFilters));
    this.homeService.getVacancies();
    this.homeService.getResumes();
  }
  
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;

  ngAfterViewChecked() {
    if (this.settingHeaderService.searchinputVisible) {
      this.inputField.nativeElement.focus();
    }
  }

  showInputField() {
    this.settingHeaderService.searchinputVisible = true;

    this.cdr.detectChanges();

    this.inputField.nativeElement.focus();
  }

  hideInputField() {
    this.settingHeaderService.searchinputVisible = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (this.inputContainer && !this.inputContainer.nativeElement.contains(event.target)) {
      this.hideInputField();
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


  searchText: string = '';


}
