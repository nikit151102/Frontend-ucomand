import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ParticipantComponent } from './participant/participant.component';
import { PopUpResponseTeamService } from '../pop-up-response-team/pop-up-response-team.service';
import { JobComponent } from './job/job.component';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ParticipantComponent, JobComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {


  itemsList = [
    {
      lastName: 'Чаплыгин',
      firstName: 'Роман',
      imageLink: 'image1_male',
      nickname: 'us',
      profession: 'Администратор'
    },
    {
      lastName: 'Ивановский',
      firstName: 'Иван',
      imageLink: 'image4_male',
      nickname: 'us',
      profession: 'SMM менеджер'
    },
    {
      lastName: 'Иванова',
      firstName: 'Марина',
      imageLink: 'image7_female',
      nickname: 'us',
      profession: 'Дизайнер'
    },
  ]

  vacancies: any;
  currentProjectData: any;
  isOwner: boolean = false;

  constructor(private popUpResponseTeamService: PopUpResponseTeamService, private projectService: ProjectService) { }

  ngOnInit(): void {

    this.projectService.currentProjectIsOwner$.subscribe((value: boolean)=>{
      this.isOwner = value;
      console.log('value', value)
    })

    this.projectService.currentProjectVacancies$.subscribe((data: any) => {
      this.vacancies = data;
    })
    this.projectService.currentProjectData$.subscribe((data: any) => {
      this.currentProjectData = data;
    })
    
  }
  getPopUoP() {
    this.popUpResponseTeamService.showPopup()
  }

  setActiveTab() {
    this.projectService.activeTab = 'myTeam';
  }

  
}

