import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ArchiveItemComponent } from './archive-item/archive-item.component';

@Component({
  selector: 'app-archive-vacancies',
  standalone: true,
  imports: [CommonModule, ArchiveItemComponent],
  templateUrl: './archive-vacancies.component.html',
  styleUrl: './archive-vacancies.component.css'
})
export class ArchiveVacanciesComponent {

}
