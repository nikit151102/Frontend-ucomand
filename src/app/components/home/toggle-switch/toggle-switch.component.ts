import { Component, HostListener } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css'
})
export class ToggleSwitchComponent {
  activeButton: string = '';
  scrollPositions: { [key: string]: number } = { vacancy: 0, resume: 0 };
  isScrolled: boolean = false;

  constructor(public homeService: HomeService) { }

  ngOnInit(): void {
    this.activeButton = this.homeService.typeToggle;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = true;
  }

  toggle(button: string) {
    if (this.isScrolled) {
      this.scrollPositions[this.activeButton] = window.scrollY;
    }

    this.activeButton = button;
    this.homeService.toggleType(button);

    setTimeout(() => {
      window.scrollTo({ top: this.scrollPositions[button] || 0, behavior: 'smooth' });
    }, 150);
  }
}