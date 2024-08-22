import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service'
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { SettingHeaderService } from '../../setting-header.service';
import { CommonModule } from '@angular/common';
import { SearchInputPhoneComponent } from './search-input-phone/search-input-phone.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ToggleSwitchComponent, SearchInputPhoneComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(public settingHeaderService: SettingHeaderService) { }

  ngOnInit(): void { }

  visibleSearch() {
    this.settingHeaderService.searchinputVisible = true;
  }
}

