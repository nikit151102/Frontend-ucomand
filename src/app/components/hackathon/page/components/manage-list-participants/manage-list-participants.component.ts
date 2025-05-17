import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HackathonService } from '../../hackathon.service';
import { NewCommandComponent } from './new-command/new-command.component';
import { ManageListParticipantsService } from './manage-list-participants.service';

@Component({
  selector: 'app-manage-list-participants',
  standalone: true,
  imports: [CommonModule, NewCommandComponent],
  templateUrl: './manage-list-participants.component.html',
  styleUrl: './manage-list-participants.component.css', 
  providers: [DatePipe ]
})
export class ManageListParticipantsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private hackathonService: HackathonService,
    public manageListParticipantsService: ManageListParticipantsService) { }

  data: any;

  ngOnInit(): void {
    this.data = this.hackathonService.getCurrentProjectData();

    if (this.data?.id) {
      // Обработка команд
      this.manageListParticipantsService.getsCommands(this.data.id).subscribe({
        next: (values: any[]) => {
          if (values?.length) {
            const pendingTeams = values.filter(item => item?.status === 'PENDING');
            const activeTeams = values.filter(item => item?.status !== 'PENDING');

            this.manageListParticipantsService.setNewTeamRequests(pendingTeams || []);
            this.manageListParticipantsService.setActiveTeams(activeTeams || []);
          }
        },
        error: (err) => console.error('Error loading teams:', err)
      });

      // Обработка участников
      this.manageListParticipantsService.getsPerson(this.data.id).subscribe({
        next: (values: any[]) => {
          if (values?.length) {
            const pendingIndividuals = values.filter(item => item?.status === 'PENDING');
            const activeIndividuals = values.filter(item => item?.status !== 'PENDING');

            this.manageListParticipantsService.setNewIndividualRequests(pendingIndividuals || []);
            this.manageListParticipantsService.setActiveIndividuals(activeIndividuals || []);
          }
        },
        error: (err) => console.error('Error loading individuals:', err)
      });
    }
  }

  closeMenage() {
    this.hackathonService.page = 'home'
  }

}
