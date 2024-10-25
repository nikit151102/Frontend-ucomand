import { Component, OnInit } from '@angular/core';
import { ToolsComponent } from './components/tools/tools.component';
import { TeamComponent } from './components/team/team.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { ProjectService } from './project.service';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './components/reviews/reviews.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ToolsComponent,TeamComponent,AboutProjectComponent, VacanciesComponent, ReviewsComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  constructor(public projectService:ProjectService){

  }

  setActiveTab(tab: 'aboutProject' | 'tape') {
    this.projectService.activeTab = tab;
  }
  
}
