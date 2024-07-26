import { Component, ViewEncapsulation } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [OverlayPanelModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SortingComponent {

  visible: boolean = false;
  paul!: string;

  ngOnInit(): void {

  }

  activeLink: string = 'Сначала новые';

  setActive(link: string) {
    this.activeLink = link;
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }
}
