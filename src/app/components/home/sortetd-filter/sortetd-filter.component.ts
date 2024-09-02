import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TagSelectorComponent } from '../../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MotivationsComponent } from '../../form-components/motivations/motivations.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SortingComponent } from './sorting/sorting.component';
import { SortetdFilterService } from './sortetd-filter.service';
import { forkJoin } from 'rxjs';
import { SettingHeaderService } from '../../setting-header.service';
import { CheckboxModule } from 'primeng/checkbox';
import { HomeService } from '../home.service';

interface Tag {
  id: number;
  name: string;
  competenceLevel?: any;
  type: 'SKILL' | 'PROFESSION' | 'MOTIVATION';
  color?: string;
}


@Component({
  selector: 'app-sortetd-filter',
  standalone: true,
  imports: [
    CommonModule,
    SortingComponent,
    DialogModule,
    TagSelectorComponent,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MotivationsComponent,
    OverlayPanelModule,
    CheckboxModule
  ],
  templateUrl: './sortetd-filter.component.html',
  styleUrls: ['./sortetd-filter.component.css'],

})
export class SortetdFilterComponent implements OnInit {
  form: FormGroup;
  visible: boolean = false;

  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];

  constructor(
    private sortetdFilterService: SortetdFilterService,
    public settingHeaderService: SettingHeaderService,
    private fb: FormBuilder,
    private homeService: HomeService,
    private cdRef: ChangeDetectorRef
  ) {
    // Initialize the reactive form
    this.form = this.fb.group({
      profession: [[]],
      skills: [[]],
      motivation: [''],
      genders: [[]]
    });
  }

  ngOnInit(): void {
    forkJoin({
      motivations: this.sortetdFilterService.getTags('MOTIVATION'),
      professions: this.sortetdFilterService.getTags('PROFESSION'),
      skills: this.sortetdFilterService.getTags('SKILL')
    }).subscribe({
      next: (results) => {
        this.motivations = results.motivations;
        this.professions = results.professions;
        this.skills = results.skills;
        this.loadFiltersFromLocalStorage();
      },
      error: (error: any) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    });
  }

  private loadFiltersFromLocalStorage(): void {
    const filters = localStorage.getItem('bodyFilters');

    if (filters) {
      try {
        const parsedFilters = JSON.parse(filters);

        if (parsedFilters.genders) {
          this.form.get('genders')?.setValue(parsedFilters.genders);
        }

        if (parsedFilters.tags) {
          const tags: Tag[] = parsedFilters.tags;

          const skills = tags.filter((tag: Tag) => tag.type === 'SKILL').map((tag: Tag) => tag);
          const professions = tags.filter((tag: Tag) => tag.type === 'PROFESSION').map((tag: Tag) => tag);
          const motivation = tags.filter((tag: Tag) => tag.type === 'MOTIVATION').map((tag: Tag) => tag);
          this.form.get('skills')?.setValue(skills);
          this.form.get('profession')?.setValue(professions);
          this.form.get('motivation')?.setValue(motivation);
        }

      } catch (error) {
        console.error('Ошибка при парсинге данных из localStorage:', error);
      }
    }
  }


  showDialog() {
    this.visible = true;
    this.cdRef.detectChanges();
    console.log("visiblevisible", this.visible)
  }

  closeDialog() {
    this.visible = false;
    this.cdRef.detectChanges();
    console.log("visiblevisible", this.visible)
  }

  onTagsChanged(tags: any[], formElement: string) {
    this.form.get(formElement)?.setValue(tags);
  }

  clearFilters() {
    this.form.reset();
    this.homeService.saveFilters({
      "visibilities": [
        "CREATOR_ONLY"
      ]
    });
    this.homeService.getVacancies();
    this.homeService.getResumes();
    this.visible = false;
  }


  submit() {
    const formData = { ...this.form.value };

    const tags = [...formData.skills, ...formData.profession, ...formData.motivation];

    const dataToSubmit = {
      ...formData,
      tags: tags,
      "visibilities": [
        "CREATOR_ONLY"
      ]
    };

    delete dataToSubmit.skills;
    delete dataToSubmit.profession;
    delete dataToSubmit.motivation;

    console.log('dataToSubmit', dataToSubmit);

    this.homeService.saveFilters(dataToSubmit);
    this.homeService.getVacancies();
    this.homeService.getResumes();
    this.closeDialog();
  }

}
