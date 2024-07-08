import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeComponent } from './resume/resume.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, VacancyComponent, ResumeComponent],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent implements OnInit {

  constructor(public viewCardService: ViewCardService, private settingHeaderService: SettingHeaderService, private router: Router) {
  }

  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
  }

  cardItem: any;

  viewUser() {
    this.router.navigate([`/user`,'root']);
  }

}
