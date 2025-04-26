import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-commands-item',
  standalone: true,
  imports: [],
  templateUrl: './commands-item.component.html',
  styleUrl: './commands-item.component.css'
})
export class CommandsItemComponent {
  @Input() item: any;
}
