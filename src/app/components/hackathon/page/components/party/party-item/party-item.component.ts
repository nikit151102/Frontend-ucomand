import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-party-item',
  standalone: true,
  imports: [],
  templateUrl: './party-item.component.html',
  styleUrl: './party-item.component.css'
})
export class PartyItemComponent {
  @Input() item: any;
}
