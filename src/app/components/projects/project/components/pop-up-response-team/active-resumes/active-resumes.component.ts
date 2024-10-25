import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopUpResponseTeamService } from '../pop-up-response-team.service';

@Component({
  selector: 'app-active-resumes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-resumes.component.html',
  styleUrl: './active-resumes.component.css'
})
export class ActiveResumesComponent implements OnInit{

  constructor(private popUpResponseTeamService: PopUpResponseTeamService) { }

  ngOnInit(): void {
     this.popUpResponseTeamService.selectedResume$.subscribe(selectedResume => {
      this.isSelected = selectedResume === this.cardItem.id;
    });
  }
  
  isSelected: boolean = false;
  @Input() cardItem: any;
  
  getSkillsColor(item: number): string {
    switch (item) {
      case 1:
        return '#50B229';
      case 2:
        return '#FAD305';
      case 3:
        return '#EE5354';
      default:
        return '';
    }
  }
  
  getSkills(item: number): string {
    console.log("item", item)
    switch (item) {
      case 1:
        return 'Junior';
      case 2:
        return 'Middle';
      case 3:
        return 'Senior';
      default:
        return '';
    }
  }


  viewCard(id: string) {
    this.popUpResponseTeamService.selectResume(id);
  }

  
}
