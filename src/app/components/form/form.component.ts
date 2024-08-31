import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TagSelectorComponent, MotivationsComponent, RadioButtonModule, TagSelectedLevelComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'] // Исправлено на styleUrls
})
export class FormComponent implements OnInit {

  @ViewChild(MotivationsComponent) motivationsComponent!: MotivationsComponent;
  @ViewChild(TagSelectedLevelComponent) tagSelectedLevelComponent!: TagSelectedLevelComponent;

  constructor(
    public formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  form!: FormGroup;

  selectedTags: { id: number, name: string, color: string }[] = [];

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

        this.form.get('motivations')?.setValue(this.motivations.filter(tag => this.selectedTags.some(st => st.name === tag.name)));
      },
      error: (error: any) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    });

    this.settingHeaderService.backbtn = true;
    this.form = this.fb.group({
      title: ['', [this.optionalValidator]],
      profession: [null, Validators.required],
      skills: [[], Validators.required],
      motivations: [this.selectedTags, Validators.required],
      gender: [''],
      details: ['', [Validators.required, Validators.maxLength(700)]]
    });

    this.form.get('motivations')?.valueChanges.subscribe(tags => {
      this.selectedTags = tags;
    });
  }

  // Пользовательский валидатор для поля title
  optionalValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Если значение пустое, валидатор возвращает null, что означает, что ошибок нет
    if (!control.value) {
      return null;
    }

    // Если значение не пустое, применяются стандартные валидаторы
    return Validators.required(control);
  }

  onMotivationsChanged(tags: { id: number, name: string, color: string }[]) {
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

  onTagsChanged(tags: { name: string; id: number; competenceLevel: number }[], formElement: string) {
    this.form.get(`${formElement}`)?.setValue(tags);
  }

  submit() {
    if (this.form.invalid) {
      // Если форма не валидна, отображаем сообщения об ошибках
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          formControl.markAsTouched(); // Подсвечиваем поля с ошибками
        }
      });

      // Логирование названий полей с ошибками
      console.log('Поля с ошибками:');
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          console.log(`Поле "${control}" не прошло валидацию.`);
        }
      });

      return;
    }

    const formData = { ...this.form.value };

    // Функция для поиска оригинального тега по имени
    const getOriginalTag = (name: string) => this.motivations.find(tag => tag.name === name);

    // Функция для добавления недостающих полей и удаления color
    const transformTags = (array: any[], type: string) => array.map(tag => ({
      ...tag,
      type: type,
      color: tag.color || null,
    }));

    // Преобразуем motivations и skills
    formData.motivations = transformTags(
      formData.motivations.map((tag: any) => getOriginalTag(tag.name) || tag),
      'MOTIVATION'
    );

    formData.skills = transformTags(
      formData.skills.map((tag: any) => getOriginalTag(tag.name) || tag),
      'SKILL'
    );

    // Извлекаем первый объект из profession и добавляем необходимые поля
    if (Array.isArray(formData.profession) && formData.profession.length > 0) {
      formData.profession = {
        ...formData.profession[0],
        competenceLevel: formData.profession[0].competenceLevel || null,
        type: 'PROFESSION'
      };
    } else {
      formData.profession = { id: 0, name: 'Java', competenceLevel: 1, type: 'PROFESSION' };
    }

    // Добавляем недостающие поля со значениями по умолчанию
    formData.visibility = "CREATOR_ONLY";
    formData.freeLink = formData.freeLink || "string";
    formData.ownLink = formData.ownLink || "string";
    formData.contacts = formData.contacts || "string";
    formData.details = formData.details || "string";
    formData.title = formData.title || "string";

    delete formData.gender; // Удаляем ненужное поле
    let typeEndpoint: string;
    console.log(formData);

    if (this.formSettingService.typeForm == 'резюме') {
      typeEndpoint = 'resumes';
    } else {
      typeEndpoint = 'vacancies';
    }

    console.log("typeEndpoint", typeEndpoint)
    // Отправляем данные
    this.formSettingService.setData(typeEndpoint, formData).subscribe(
      (response) => {
        console.log("response", response);

        if (typeEndpoint == 'resumes') {
          localStorage.setItem('routeTypeCard', 'resumes');
          this.router.navigate(['/resume', response.id]);
        } else {
          localStorage.setItem('routeTypeCard', 'vacancies');
          this.router.navigate(['/vacancy', response.id]);
        }

        // Очистка формы после успешной отправки
        this.form.reset({
          title: '',
          profession: [],
          skills: [],
          motivations: [],
          gender: '',
          details: ''
        });
        this.motivationsComponent.reset();
        this.tagSelectedLevelComponent.reset();

      },
      (error) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    );
  }


}
