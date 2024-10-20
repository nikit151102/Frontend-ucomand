import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { item } from './card-tariffs.interface';


@Component({
  selector: 'app-card-tariffs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tariffs.component.html',
  styleUrl: './card-tariffs.component.css'
})
export class CardTariffsComponent {

  @Input() cardItem: item = {
    icon: '',
    price: 0,
    title: '',
    conditions: [{
      title: '',
      value: '',
      textItem: '',
    }
    ],
    descriptions: ['', '']
  };

}
