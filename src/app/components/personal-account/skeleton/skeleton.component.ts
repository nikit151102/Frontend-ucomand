import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  
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