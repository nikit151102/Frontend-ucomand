import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  activeButton: string = 'vacancies';

  toggle(button: string) {
    this.activeButton = button;
  }



}

