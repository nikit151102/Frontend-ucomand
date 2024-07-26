import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service'
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  activeButton: string = '';

  constructor(public homeService: HomeService){ }

  ngOnInit(): void {
    this.activeButton = this.homeService.typeToggle;
  }

  toggle(button: string) {
    this.activeButton = button;
    this.homeService.typeToggle = button;
  }

}

