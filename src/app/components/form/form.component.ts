import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveChangesPopupComponent } from './save-changes-popup/save-changes-popup.component';
import { SaveChangesPopupService } from './save-changes-popup/save-changes-popup.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagSelectorComponent,
    MotivationsComponent,
    RadioButtonModule,
    TagSelectedLevelComponent,
    SaveChangesPopupComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild(MotivationsComponent) motivationsComponent!: MotivationsComponent;
  @ViewChild(TagSelectedLevelComponent) tagSelectedLevelComponent!: TagSelectedLevelComponent;

  form!: FormGroup;
  selectedTags: { id: number, name: string, color: string }[] = [];
  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];
  typeForm: string = '';
  isEditMode: boolean = false;
  visible: boolean = false;
  activeLink: string = 'Сначала новые';

  private readonly FORM_STORAGE_KEY = 'formData';

  constructor(
    public formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public saveChangesPopupService: SaveChangesPopupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.data.subscribe(data => {
      const routeName = data['routeName'];
      this.isEditMode = routeName.includes('update');
      this.typeForm = routeName.includes('Resume') ? 'резюме' : 'вакансии';

      if (this.isEditMode) {
        this.loadExistingData();
      } else {
        this.initializeForm();
        this.loadFormDataFromStorage();
      }
    });

    forkJoin({
      motivations: this.formSettingService.getTags('MOTIVATION'),
      professions: this.formSettingService.getTags('PROFESSION'),
      skills: this.formSettingService.getTags('SKILL')
    }).subscribe({
      next: (results) => {
        this.motivations = results.motivations;
        this.professions = results.professions;
        this.skills = results.skills;
        this.form.get('motivations')?.setValue(
          this.motivations.filter(tag => this.selectedTags.some(st => st.name === tag.name))
        );
      }
    });

    this.settingHeaderService.backbtn = true;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: ['', [this.optionalValidator, Validators.maxLength(100)]],
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

  loadFormDataFromStorage(): void {
    const savedData = localStorage.getItem(this.FORM_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (parsedData.type === this.typeForm) {
        this.saveChangesPopupService.showPopup();
        const formData = parsedData.formData;
        this.form.patchValue(formData);

        this.form.get('skills')?.setValue(formData.skills);
        this.form.get('profession')?.setValue([formData.profession]);
        this.form.get('motivations')?.setValue(formData.motivations);
      }
    }
  }

  clearDraft(): void {
    localStorage.removeItem(this.FORM_STORAGE_KEY);
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
    this.saveChangesPopupService.hidePopup();
  }

  loadExistingData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const typeEndpoint = this.typeForm === 'резюме' ? ['resumes', id] : ['vacancies', id];
      this.formSettingService.getDataById(typeEndpoint[0], typeEndpoint[1]).subscribe((data: any) => {
        console.log("getDataById", data)
        this.initializeForm();

        this.form.patchValue(data);

        this.form.get('skills')?.setValue(data.skills);
        this.form.get('profession')?.setValue([data.profession]);
        this.form.get('motivations')?.setValue(data.motivations);

      });
    }
  }

  optionalValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value ? Validators.required(control) : null;
  }

  onMotivationsChanged(tags: { id: number, name: string, color: string }[]): void {
    this.form.get('motivations')?.setValue(tags);
  }

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '46px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  setActive(link: string): void {
    this.activeLink = link;
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  onTagsChanged(tags: { id: number; name: string; competenceLevel: number | null; type: string, color: string | null }[], formElement: string): void {
    this.form.get(formElement)?.setValue(tags);
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          formControl.markAsTouched();
        }
      });

      console.error('Поля с ошибками:');
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          console.error(`Поле "${control}" не прошло валидацию.`);
        }
      });

      return;
    }

    const formData = this.prepareFormData();

    const typeEndpoint = this.typeForm === 'резюме' ? 'resumes' : 'vacancies';

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.formSettingService.putDataById(typeEndpoint, formData, id).subscribe(
          (response) => {
            this.handleSuccess(response, typeEndpoint)
          },
          (error:any) => {
            if (error.status) {
              this.router.navigate(['/error', { num: error.status }]);
            } else {
              this.router.navigate(['/error', { num: 500 }]);
            }
          }
        );
      }
    } else {
      this.formSettingService.setData(typeEndpoint, formData).subscribe(
        (response) => {
          this.handleSuccess(response, typeEndpoint)
        },
        (error:any) => {
          if (error.status) {
            this.router.navigate(['/error', { num: error.status }]);
          } else {
            this.router.navigate(['/error', { num: 500 }]);
          }
        }
      );

    }
  }

  prepareFormData(): any {
    const formData = { ...this.form.value };

    const getOriginalTag = (name: string) => this.motivations.find(tag => tag.name === name);
    const transformTags = (array: any[], type: string) => array.map(tag => ({
      ...tag,
      type: type,
      color: tag.color || null,
    }));

    formData.motivations = transformTags(
      formData.motivations.map((tag: any) => getOriginalTag(tag.name) || tag),
      'MOTIVATION'
    );

    formData.skills = transformTags(
      formData.skills.map((tag: any) => getOriginalTag(tag.name) || tag),
      'SKILL'
    );

    formData.profession = {
      ...formData.profession[0],
      competenceLevel: formData.profession[0].competenceLevel || null,
      type: 'PROFESSION'
    };


    formData.visibility = "CREATOR_ONLY";
    formData.freeLink = formData.freeLink || "string";
    formData.ownLink = formData.ownLink || "string";
    formData.contacts = formData.contacts || "string";
    formData.details = formData.details || "string";
    formData.title = formData.title || "string";

    delete formData.gender;
    return formData
  }

  handleSuccess(response: any, typeEndpoint: string): void {
    console.log("response", response);

    localStorage.setItem('routeTypeCard', typeEndpoint);
    const userId = localStorage.getItem('userId')
    const route = typeEndpoint === 'resumes' ? [`/resume`, response.id] : [`/vacancy`, response.id];
    this.router.navigate(route);

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
  }

  saveFormDataToStorage(): void {
    const formData = this.prepareFormData();
    localStorage.setItem(this.FORM_STORAGE_KEY, JSON.stringify({ formData, type: this.typeForm }));
  }

  @HostListener('window:beforeunload')
  handleBeforeUnload(): void {
    this.saveFormDataToStorage();
  }

}
