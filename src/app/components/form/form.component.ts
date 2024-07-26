import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TagSelectorComponent, MotivationsComponent, RadioButtonModule, TagSelectedLevelComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  constructor(public formSettingService: FormSettingService, private settingHeaderService: SettingHeaderService) { }

  visible: boolean = false;
  paul!: string;

  ngOnInit(): void {
    this.settingHeaderService.backbtn = true;
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
