import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ViewCardService } from '../../view-card/view-card.service';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';


@Component({
  selector: 'app-personal-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class PersonalResumeComponent implements OnInit {

  @Input() cardItem: any;

  constructor(private router: Router, private viewCardService: ViewCardService, private resumeService: ResumeService) { }
  ngOnInit(): void {
    console.log("cardItem", this.cardItem)
  }

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

  getMotivationColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#ffab00';
      case 'Практика':
        return '#cf87f1';
      case 'За долю':
        return '#298cf4';
      case 'За оплату':
        return '#23b9b0';
      default:
        return '';
    }
  }

  isSettingActive: boolean = false;

  Actived() {
    this.isSettingActive = !this.isSettingActive
  }

  viewCard(type: string, route: string) {
    this.viewCardService.selectedCard = this.cardItem.id;
    this.viewCardService.typeCard = type;
    localStorage.setItem('routeTypeCard', type);
    this.router.navigate([`/${route}`, this.cardItem.id]);

  }

  setArchive() {
    if (this.cardItem) {
      this.resumeService.toggleResumeArchive(this.cardItem);
    }
  }
}
