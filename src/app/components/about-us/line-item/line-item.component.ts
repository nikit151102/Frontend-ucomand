import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-item.component.html',
  styleUrl: './line-item.component.css'
})
export class LineItemComponent {
  @Input() value: string = '';
  @Input() width: number = 0;
  @Input() color: string = '';
  @Input() stroke: string = '';
  
}
