import { Component } from '@angular/core';
import { PopUpResponseTeamService } from './pop-up-response-team.service';
import { CommonModule } from '@angular/common';
import { ActiveResumesComponent } from './active-resumes/active-resumes.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pop-up-response-team',
  standalone: true,
  imports: [CommonModule, ActiveResumesComponent, FormsModule],
  templateUrl: './pop-up-response-team.component.html',
  styleUrl: './pop-up-response-team.component.css'
})
export class PopUpResponseTeamComponent {


  constructor(public popUpResponseTeamService: PopUpResponseTeamService) { }
  resumesList: any[] = [];
  textarea: string = '';

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
    
    this.popUpResponseTeamService.setTeamProject(this.textarea).subscribe(
      (response: any) => {
        console.log('response',response)
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных резюме:', error);
      }
    );

    this.popUpResponseTeamService.hidePopup();
  }

  cancel(): void {
    this.popUpResponseTeamService.hidePopup();
  }

}
