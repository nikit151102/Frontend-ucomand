import { Component, OnInit } from '@angular/core';
import { SettingHeaderService } from '../../setting-header.service';
import { ArchiveResumeComponent } from '../archive-resume/archive-resume.component';
import { ArchiveVacancyComponent } from '../archive-vacancy/archive-vacancy.component';
import { PersonalResumeComponent } from '../resume/resume.component';
import { PersonalVacancyComponent } from '../vacancy/vacancy.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal-home',
  standalone: true,
  imports: [CommonModule, RouterLink,PersonalVacancyComponent, PersonalResumeComponent, ArchiveResumeComponent, ArchiveVacancyComponent],
  templateUrl: './personal-home.component.html',
  styleUrl: './personal-home.component.css'
})
export class PersonalHomeComponent implements OnInit{

  constructor( private settingHeaderService: SettingHeaderService){}
  
  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.post = true;
    this.settingHeaderService.backbtn = false;
  }

  personalVacanciesData = [
    {
        id: 1,
        title: 'Backend разработчик',
        context: 'UX-тестировщик.',
        skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов', 'Тестирование программного обеспечения', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов'],
        motivations: ['За долю', 'За оплату', 'Практика'],
        fullName: 'Иванов Павел Сергеевич',
        date: '2024-06-29'
    },
    {
        id: 2,
        title: 'Frontend разработчик',
        context: 'Крупная IT-компания ищет креативного и ответственного разработчика frontend для создания пользовательских интерфейсов.',
        skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
        motivations: ['За оплату', 'Практика'],
        fullName: 'Петрова Елена Александровна',
        date: '2024-06-29'
    }]
}
