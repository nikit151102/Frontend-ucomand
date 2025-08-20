import { Component } from '@angular/core';
import { OneSectionComponent } from './sections/one-section/one-section.component';
import { TwoSectionComponent } from './sections/two-section/two-section.component';
import { ThirdSectionComponent } from './sections/third-section/third-section.component';
import { FourthSectionComponent } from "./sections/fourth-section/fourth-section.component";
import { FifthSectionComponent } from "./sections/fifth-section/fifth-section.component";

@Component({
  selector: 'app-public-lending',
  standalone: true,
  imports: [OneSectionComponent, TwoSectionComponent, ThirdSectionComponent, FourthSectionComponent, FifthSectionComponent],
  templateUrl: './public-lending.component.html',
  styleUrl: './public-lending.component.css'
})
export class PublicLendingComponent {

}
