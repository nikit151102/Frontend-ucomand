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
import { ScreensaverComponent } from './components/screensaver/screensaver.component';
import { CreateEditProjectsService } from '../create-edit-projects/create-edit-projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ToolsComponent, TeamComponent, AboutProjectComponent, VacanciesComponent, ReviewsComponent, PopUpResponseTeamComponent, TapeComponent, ScreensaverComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  isPopupVisible: boolean = false;

  constructor(public projectService: ProjectService, private popUpResponseTeamService: PopUpResponseTeamService, private route: ActivatedRoute) {

  }

  projectData: any;
  private paramId: string | null = null;
  detailsListProject: { 'title': string, 'context': string }[] | null = null;

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    console.log('paramId', this.paramId)
    if (this.paramId)
      this.projectData = this.projectService.getCurrentProject(this.paramId).subscribe((dataProject: any) => {
        this.projectService.setProjectData(dataProject);
        this.projectData = dataProject;
        this.detailsListProject = [
          {
            title: 'Описание',
            context: dataProject.description
          },
          {
            title: 'Этап развития',
            context: dataProject.developmentStage
          },
          {
            title: 'Задачи',
            context: dataProject.tasks
          },
        ]
        console.log('dataProject', dataProject)
      })

    this.popUpResponseTeamService.visible$.subscribe(visible => {
      this.isPopupVisible = visible;
    });

    const imageUrl = "https://s3-alpha-sig.figma.com/img/1794/ba72/32c521779550b3739252f0a0fa851e85?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ThIZOtZLeGKH4-q0ljiIalrTJMAMWdAjTdo8smUxwUkli0I7kR5FSieo-PW-ZZ2D2Lq7284lOFICZwOVSM1K2AJ7g487SO9LYygzKe5l6-uzkHOOadpHltpoyVdDfXPGXGTX~tkAAeCgtGigpBYGNJDDnjpRuSYq6z3B1zExkAgXmBBMGVdgpOfVxL9VLM4RPAQyzSlZm4g8oXbP5NSJkPA49lOF-q8TNfa9WQkZYkc~oqHMbVWn-8G1MKxf7ftMtbroqfLivnfkpSmC7CutO7Er18fjDumIiR1XsnI5Vx7F9Wi6Mtz7GvJs~wSj8PnrcYhNuu1l~4cL6YELrEVbOQ__";
    const overlayElement = document.querySelector('.overlay') as HTMLElement;

    if (overlayElement) {
      overlayElement.style.backgroundImage = `url(${imageUrl})`;
      overlayElement.style.backgroundSize = 'cover';
      overlayElement.style.backgroundPosition = 'center';
    }
  }


  setActiveTab(tab: 'aboutProject' | 'tape') {
    this.projectService.activeTab = tab;
  }

}
