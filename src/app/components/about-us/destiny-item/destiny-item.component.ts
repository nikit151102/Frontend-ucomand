import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destiny-item',
  standalone: true,
  imports: [],
  templateUrl: './destiny-item.component.html',
  styleUrl: './destiny-item.component.css'
})
export class DestinyItemComponent {
  @Input() value: string = '';
}
