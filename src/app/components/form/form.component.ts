import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TagSelectorComponent, MotivationsComponent, RadioButtonModule, TagSelectedLevelComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  // tagss: string[] = ['Яндекс Трекер', 'Юзабилити-аудит сайта', 'Установка и обслуживание офисной техники', 'Контекстная реклама', ' САПР', 'Objective-С', '3d анимация', 'XML', 'Webflow', 'Web 3.0', 'Objective-С', 'Android User Interface Guidelines', 'Android User Interface Guidelines', 'Objective-С', 'Objective-С', 'Android User Interface Guidelines', 'Android User Interface Guidelines', 'Objective-С', 'Objective-С'];

  tagss: { name: string, id: number }[] = [
    { name: 'Яндекс Трекер', id: 1 },
    { name: 'Юзабилити-аудит сайта', id: 2 },
  ];

  constructor(public formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private fb: FormBuilder) { }

  form!: FormGroup;

  selectedTags: {id:number, name: string, color: string }[] = [];

  ngOnInit(): void {
    this.settingHeaderService.backbtn = true;
    this.form = this.fb.group({
      title: [''],
      specialization: [[]],
      skills: [[]],
      motivations: [this.selectedTags],
      gender: [''],
      description: ['']
    });

    this.form.get('motivations')?.valueChanges.subscribe(tags => {
      this.selectedTags = tags;
    });
  }

  onMotivationsChanged(tags: {id: number,  name: string, color: string }[]) {
    this.form.get('motivations')?.setValue(tags);
  }

  submit() {
    const formData = { ...this.form.value };

    const removeColorProperty = (array: any[]) => array.map(({ color, ...rest }) => rest);

    formData.motivations = removeColorProperty(formData.motivations);
    formData.specialization = removeColorProperty(formData.specialization);
    formData.skills = removeColorProperty(formData.skills);

    console.log(formData);
  }


  visible: boolean = false;
  paul!: string;

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

  onTagsChanged(tags: { name: string; id: number; level: string }[], formElement: string) {
    this.form.get(`${formElement}`)?.setValue(tags);
  }

}
