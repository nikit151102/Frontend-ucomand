import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FormSettingService } from '../../../../form/form-setting.service';
import { SettingHeaderService } from '../../../../setting-header.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css'
})
export class VacanciesComponent implements OnInit {

  isTablet = false;
  isMobile = false;
  projectData: any;
  vacancies: any = [];

  constructor(private router: Router, private formSettingService: FormSettingService, private settingHeaderService: SettingHeaderService, private projectService: ProjectService,) {

  }

  ngOnInit() {
    this.projectService.currentProjectData$.subscribe((value: any) => {
      this.projectData = value;

      if (this.projectData?.id) {
          this.projectService.getVacanciesProject(this.projectData.id).subscribe(
              (response: any) => {
                  console.log('vacancies', response);
                  this.vacancies = response?.data || []; 
                  this.projectService.setCurrentProjectVacancies(response?.data)
              },
              (error) => {
                  console.error('Error fetching vacancies:', error);
              }
          );
      } else {
          console.warn('Project data or ID is not defined:', this.projectData);
      }
  });

    this.updateView(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateView(event.target.innerWidth);
  }

  updateView(width: number): void {
    if (width >= 768) {
      this.isTablet = true;
      this.isMobile = false;
    } else {
      this.isTablet = false;
      this.isMobile = true;
    }
  }

  getCardUrl(cardValue: any, type: string, route: string): string {
    localStorage.setItem('routeTypeCard', type);
    return this.router.createUrlTree([route, cardValue]).toString();
  }

  onCardClick(event: MouseEvent, cardId: any, type: string): void {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.router.navigate([`/${type}`, cardId]);
  }


  newVacancyProject() {
    const userNickname = localStorage.getItem('userNickname');
    this.formSettingService.isheading = false;
    this.formSettingService.typeForm = 'вакансии';
    this.settingHeaderService.post = false;
    this.settingHeaderService.shared = false;

    if (!this.projectData || !this.projectData.id) {
      console.error('Invalid project data:', this.projectData);
      return;
    }

    this.router.navigate([`/${userNickname}/account/newVacancy`], {
      queryParams: { isProject: true, idProject: this.projectData.id }
    });
  }


}
