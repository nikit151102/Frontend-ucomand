import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';
import { forkJoin } from 'rxjs';

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

  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];



  ngOnInit(): void {
    // Выполняем все запросы параллельно
    forkJoin({
      motivations: this.formSettingService.getTags('MOTIVATION'),
      professions: this.formSettingService.getTags('PROFESSION'),
      skills: this.formSettingService.getTags('SKILL')
    }).subscribe({
      next: (results) => {
        this.motivations = results.motivations;
        this.professions = results.professions;
        this.skills = results.skills;
        
        console.log('Теги (MOTIVATION):', this.motivations);
        // console.log('Теги (PROFESSION):', this.professions);
        // console.log('Теги (SKILL):', this.skills);
        this.form.get('motivations')?.setValue(this.motivations.filter(tag => this.selectedTags.some(st => st.name === tag.name)));
      },
      error: (error: any) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    });
    
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


  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '46px'; // Сбросить высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Установить новую высоту
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


  submit() {
    const formData = { ...this.form.value };
  
    // Функция для поиска оригинального тега по имени
    const getOriginalTag = (name: string) => this.motivations.find(tag => tag.name === name);
  
    const removeColorProperty = (array: any[]) => array.map(({ color, ...rest }) => rest);
  
    // Преобразуем выбранные теги в формат, соответствующий данным с сервера
    formData.motivations = removeColorProperty(
      formData.motivations.map((tag: any) => getOriginalTag(tag.name) || tag)
    );
    formData.specialization = removeColorProperty(
      formData.specialization.map((tag: any) => getOriginalTag(tag.name) || tag)
    );
    formData.skills = removeColorProperty(
      formData.skills.map((tag: any) => getOriginalTag(tag.name) || tag)
    );
  
    console.log(formData);
  }
  
}
