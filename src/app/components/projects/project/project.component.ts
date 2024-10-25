import { Component, OnInit } from '@angular/core';
import { ToolsComponent } from './components/tools/tools.component';
import { TeamComponent } from './components/team/team.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { ProjectService } from './project.service';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { PopUpResponseTeamService } from './components/pop-up-response-team/pop-up-response-team.service';
import { PopUpResponseTeamComponent } from './components/pop-up-response-team/pop-up-response-team.component';
import { TapeComponent } from './components/tape/tape.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ToolsComponent,TeamComponent,AboutProjectComponent, VacanciesComponent, ReviewsComponent, PopUpResponseTeamComponent, TapeComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  isPopupVisible: boolean = false;

  constructor(public projectService:ProjectService, private popUpResponseTeamService:PopUpResponseTeamService){

  }

  ngOnInit(): void {
    this.popUpResponseTeamService.visible$.subscribe(visible => {
      this.isPopupVisible = visible;
    })
  }

  setActiveTab(tab: 'aboutProject' | 'tape') {
    this.projectService.activeTab = tab;
  }
  
}
