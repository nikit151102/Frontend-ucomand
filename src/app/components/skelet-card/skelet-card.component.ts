import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { HomeService } from '../home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skelet-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skelet-card.component.html',
  styleUrl: './skelet-card.component.css'
})
export class SkeletCardComponent {

  @Input() title: boolean = false;
  background: string = '';

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.activeTheme$.subscribe(theme => {
      this.applyTheme(theme);
    });
  }

  private applyTheme(theme: string) {
    if (theme === 'dark') {
      this.background = '#3a3a3a';
    } else {
      this.background = '#e0e0e0';
    }
  }
}
