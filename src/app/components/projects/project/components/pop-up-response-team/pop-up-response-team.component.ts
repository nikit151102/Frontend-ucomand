import { Component } from '@angular/core';
import { PopUpResponseTeamService } from './pop-up-response-team.service';
import { CommonModule } from '@angular/common';
import { ActiveResumesComponent } from './active-resumes/active-resumes.component';
@Component({
  selector: 'app-pop-up-response-team',
  standalone: true,
  imports: [CommonModule, ActiveResumesComponent],
  templateUrl: './pop-up-response-team.component.html',
  styleUrl: './pop-up-response-team.component.css'
})
export class PopUpResponseTeamComponent {


  constructor(public popUpResponseTeamService: PopUpResponseTeamService) { }
  resumesList: any[] = [];

  ngOnInit(): void {
    this.popUpResponseTeamService.selectResume('');
    this.popUpResponseTeamService.getCardsData().subscribe(
      (response: any) => {
        this.resumesList = response;
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных резюме:', error);
      }
    );
  }

  submit(): void {
    this.popUpResponseTeamService.hidePopup();
  }

  cancel(): void {
    this.popUpResponseTeamService.hidePopup();
  }

}
