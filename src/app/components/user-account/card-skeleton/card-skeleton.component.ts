import { Component, Input } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.css'
})
export class CardSkeletonComponent {

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
      this.background = 'rgb(103 87 201)';
    } else {
      this.background = '#e0e0e0';
    }
  }

}