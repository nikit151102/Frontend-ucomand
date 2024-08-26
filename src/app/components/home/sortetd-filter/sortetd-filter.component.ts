import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TagSelectorComponent } from '../../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MotivationsComponent } from '../../form-components/motivations/motivations.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SortingComponent } from './sorting/sorting.component';
import { SortetdFilterService } from './sortetd-filter.service';
import { forkJoin } from 'rxjs';
import { SettingHeaderService } from '../../setting-header.service';

@Component({
  selector: 'app-sortetd-filter',
  standalone: true,
  imports: [CommonModule, SortingComponent, DialogModule, TagSelectorComponent, RadioButtonModule, FormsModule, MotivationsComponent, OverlayPanelModule],
  templateUrl: './sortetd-filter.component.html',
  styleUrl: './sortetd-filter.component.css',
})
export class SortetdFilterComponent implements OnInit {


  constructor(private sortetdFilterService: SortetdFilterService, public settingHeaderService: SettingHeaderService) { }

  visible: boolean = false;

  selectedGender: string = '';

  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];

  ngOnInit(): void {
    // Выполняем все запросы параллельно
    forkJoin({
      motivations: this.sortetdFilterService.getTags('MOTIVATION'),
      professions: this.sortetdFilterService.getTags('PROFESSION'),
      skills: this.sortetdFilterService.getTags('SKILL')
    }).subscribe({
      next: (results) => {
        this.motivations = results.motivations;
        this.professions = results.professions;
        this.skills = results.skills;
        
        // console.log('Теги (MOTIVATION):', this.motivations);
        // console.log('Теги (PROFESSION):', this.professions);
        // console.log('Теги (SKILL):', this.skills);
      },
      error: (error: any) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog(event: Event) {
    event.stopPropagation();
    this.visible = false;
  }

  clearFilters() {
    // Логика сброса фильтров
  }

  applyFilters() {
    // Логика применения фильтров
    this.visible = false;
  }

}
