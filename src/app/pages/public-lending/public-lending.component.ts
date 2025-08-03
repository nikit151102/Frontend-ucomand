import { Component } from '@angular/core';
import { OneSectionComponent } from './sections/one-section/one-section.component';
import { TwoSectionComponent } from './sections/two-section/two-section.component';

@Component({
  selector: 'app-public-lending',
  standalone: true,
  imports: [OneSectionComponent, TwoSectionComponent],
  templateUrl: './public-lending.component.html',
  styleUrl: './public-lending.component.css'
})
export class PublicLendingComponent {

}
