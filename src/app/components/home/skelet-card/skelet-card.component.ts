import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skelet-card',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skelet-card.component.html',
  styleUrl: './skelet-card.component.css'
})
export class SkeletCardComponent {

}
