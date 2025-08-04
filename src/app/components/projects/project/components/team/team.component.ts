import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ParticipantComponent } from './participant/participant.component';
import { PopUpResponseTeamService } from '../pop-up-response-team/pop-up-response-team.service';
import { JobComponent } from './job/job.component';
import { ProjectService } from '../../project.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ParticipantComponent, JobComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {


  itemsList = []

  vacancies: any;
  currentProjectData: any;
  isOwner: boolean = false;

  constructor(private popUpResponseTeamService: PopUpResponseTeamService, private projectService: ProjectService, private teamService: TeamService) { }

  ngOnInit(): void {

    this.projectService.currentProjectIsOwner$.subscribe((value: boolean) => {
      this.isOwner = value;
      console.log('value', value)
    })

    this.projectService.currentProjectVacancies$.subscribe((data: any) => {
      this.vacancies = data;
    })
    this.projectService.currentProjectData$.subscribe((data: any) => {
      this.currentProjectData = data;
      if (data != null) {
        this.teamService.getTeamProject(this.currentProjectData?.id).subscribe((value: any) => {
          this.itemsList = value;
        })
      }

    })



  }

  checkUserInTeam(itemsList: any[]): boolean {
    // Получаем данные пользователя из sessionStorage
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      console.warn('Пользователь не авторизован!');
      return false;
    }

    let userId: number;
    try {
      userId = JSON.parse(userData).id;
      console.log('userId', userId)
    } catch (error) {
      console.error('Ошибка парсинга userData:', error);
      return false;
    }

    // Проверяем, есть ли userId в itemsList
    return itemsList.some(item => item.user?.id === userId);
  }



  getPopUoP() {
    this.popUpResponseTeamService.showPopup()
  }

  setActiveTab() {
    this.projectService.activeTab = 'myTeam';
  }


}

