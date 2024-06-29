import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TagSelectorComponent } from './tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MotivationsComponent } from './motivations/motivations.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-sortetd-filter',
  standalone: true,
  imports: [CommonModule, DialogModule, TagSelectorComponent, RadioButtonModule, FormsModule, MotivationsComponent, OverlayPanelModule],
  templateUrl: './sortetd-filter.component.html',
  styleUrl: './sortetd-filter.component.css'
})
export class SortetdFilterComponent implements OnInit {


  visible: boolean = false;
  paul!: string;

  ngOnInit(): void {

  }
  tags: string[] = ['Яндекс Трекер', 'Юзабилити-аудит сайта', 'Установка и обслуживание офисной техники', 'Контекстная реклама', ' САПР', 'Objective-С', '3d анимация', 'XML', 'Webflow', 'Web 3.0', 'Objective-С', 'Android User Interface Guidelines', 'Android User Interface Guidelines', 'Objective-С', 'Objective-С', 'Android User Interface Guidelines', 'Android User Interface Guidelines', 'Objective-С', 'Objective-С'];
  showDialog() {
    this.visible = true;
  }


  activeLink: string = 'Сначала новые';

  setActive(link: string) {
    this.activeLink = link;
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }

}
