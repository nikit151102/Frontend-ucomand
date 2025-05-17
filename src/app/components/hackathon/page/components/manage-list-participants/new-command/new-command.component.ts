import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewCommandService } from './new-command.service';
import { ManageListParticipantsService } from '../manage-list-participants.service';
import { HackathonService } from '../../../hackathon.service';

@Component({
  selector: 'app-new-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-command.component.html',
  styleUrl: './new-command.component.css'
})
export class NewCommandComponent {

  @Input() data: any;

  constructor(private datePipe: DatePipe, private newCommandService: NewCommandService,
    private manageListParticipantsService: ManageListParticipantsService,
    private hackathonService:HackathonService
  ) { }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd.MM.yyyy в HH:mm') || '';
  }

  rejectCommand(id: any) {
    this.newCommandService.rejectCommand(id).subscribe((data: any) => {
      this.manageListParticipantsService.removeNewTeamRequest(id);
    })
  }

  addCommand(data: any) {
    let hackData = this.hackathonService.getCurrentProjectData();
    this.newCommandService.addCommand(hackData.id, data).subscribe((data: any) => {
      this.manageListParticipantsService.addNewTeamRequest(data);
    })
  }
}
