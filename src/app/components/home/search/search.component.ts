import { Component, OnInit } from '@angular/core';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { SettingHeaderService } from '../../setting-header.service';
import { CommonModule } from '@angular/common';
import { SearchInputPhoneComponent } from './search-input-phone/search-input-phone.component';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ToggleSwitchComponent, SearchInputPhoneComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchText: string = '';

  constructor(public settingHeaderService: SettingHeaderService, private homeService: HomeService) {
  }

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

  searchValue(){
    const filters = sessionStorage.getItem('bodyFilters');
    let bodyFilters = filters ? JSON.parse(filters) : {};

    if (this.searchText.length == 0) {
      if (bodyFilters.searchText && bodyFilters.searchText.length > 0) {
        delete bodyFilters.searchText;
        sessionStorage.setItem('bodyFilters', JSON.stringify(bodyFilters)); 
        this.homeService.searchCards(); 
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
    this.homeService.searchCards();
  }
  
  visibleSearch() {
    this.settingHeaderService.searchinputVisible = true;
  }
}

