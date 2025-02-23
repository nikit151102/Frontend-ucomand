import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../project.service';
import { PopUpResponseTeamService } from '../../pop-up-response-team/pop-up-response-team.service';
import { TeamValueComponent } from './team-value/team-value.component';
import { MyTeamService } from './my-team.service';

@Component({
  selector: 'app-mu-team',
  standalone: true,
  imports: [CommonModule, TeamValueComponent],
  templateUrl: './mu-team.component.html',
  styleUrl: './mu-team.component.css'
})
export class MuTeamComponent implements OnInit {

  teamMembers: any;

  constructor(public projectService: ProjectService, private myTeamService: MyTeamService) { }

  ngOnInit(): void {
    let projectData = this.projectService.getCurrentProjectData();
    this.myTeamService.getTeamMembers(projectData.id).subscribe((data: any) => {
      this.teamMembers = data;
      console.log('itemitem', data)
    })
  }

}