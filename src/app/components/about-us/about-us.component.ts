import { Component, OnDestroy } from '@angular/core';
import { DestinyItemComponent } from './destiny-item/destiny-item.component';
import { CommonModule } from '@angular/common';
import { LineItemComponent } from './line-item/line-item.component';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, DestinyItemComponent, LineItemComponent, BackgroundImgsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnDestroy{
  savedTheme: string = '';
  constructor(private homeService: HomeService) {
  
  }
  ngOnInit(): void {
    this.savedTheme = localStorage.getItem('theme') || 'light';
    this.homeService.changeTheme('dark');
      document.documentElement.style.setProperty('--background', '#333334');
      document.documentElement.style.setProperty('--background-card', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--card-hover', '#5a4bb8');
      document.documentElement.style.setProperty('--font-color', '#fff');
      document.documentElement.style.setProperty('--background-archive', 'rgba(255, 255, 255, 0.05)');
      document.documentElement.style.setProperty('--card-archive', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--background-card-account', '#5a4bb8');
      document.documentElement.style.setProperty('--card-hover-account', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--line-item', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--logo-text-color', '#fff');
      document.documentElement.style.setProperty('--logo-background-color', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--font-profession-eng', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--screensaver-color', '#a6eb20');
      document.documentElement.style.setProperty('--screensaver-background', '#474748');
  }
  ngOnDestroy(): void {
    this.homeService.changeTheme(this.savedTheme);
  }

  direction: string = 'left';
  tagsList = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'TypeScript', 'PHP', 'Swift', 'Kotlin',
    'Go', 'Rust', 'Dart', 'Objective-C', 'Scala', 'Perl', 'Lua', 'Haskell', 'MATLAB', 'R',
    'Elixir', 'F#', 'Clojure', 'Groovy', 'Visual Basic .NET', 'SQL', 'HTML', 'CSS', 'Sass', 'Less',
    'React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails',
    'ASP.NET', 'Express.js', 'NestJS', 'Laravel', 'Symfony', 'Meteor', 'Ember.js', 'Backbone.js', 'jQuery', 'Bootstrap'
  ];

  destinyList = [
    'специалистов IT-сферы, которые хотят найти работу ',
    'владельцев IT-компаний/HR-менеджеров, которым нужны специалисты в штат',
    'энтузиастов, готовых вместе создать стартап-проек',
    'специалистов уровня Junior, которым необходима практика для применений полученных знаний(курсов)',
    'фрилансеров и их клиентов',
    'для специалистов сопутствующих специальностей'
  ];

  itemLineList = [
    { stroke: '#298cf4', color: 'linear-gradient(270deg, #298cf4 0%, rgba(41, 140, 244, 0.3) 100%)', width: 25, value: '1. Разработка и запуск Web-версии платформы UTeam.top с начальным функционалом (поиск/размещение резюме и вакансий) ', border: "#298cf4" },
    { stroke: '#23b9b0', color: 'linear-gradient(270deg, #23b9b0 0%, rgba(35, 185, 176, 0.3) 100%)', width: 28, value: '2. Мобильная версия Android/IOS', border: 'rgba(255, 255, 255, 0.1)' },
    { stroke: '#50b229', color: 'linear-gradient(270deg, #50b229 0%, rgba(80, 178, 41, 0.3) 100%)', width: 31, value: '3. Обновление, добавление разделов и функционала', border: 'rgba(255, 255, 255, 0.1)' },
    { stroke: '#806bff', color: 'linear-gradient(270deg, #806bff 0%, rgba(128, 107, 255, 0.3) 100%)', width: 33, value: '4. Создание Crypto-token.', border: 'rgba(255, 255, 255, 0.1)' },
    { stroke: '#cf87f1', color: 'linear-gradient(270deg, #cf87f1 0%, rgba(207, 135, 241, 0.3) 100%)', width: 36, value: '5. Telegram-app', border: 'rgba(255, 255, 255, 0.1)' },
    { stroke: '#ffab00', color: 'linear-gradient(270deg, #ffab00 0%, rgba(255, 171, 0, 0.3) 100%)', width: 42, value: '7. Обновление, добавление разделов и функционала', border: 'rgba(255, 255, 255, 0.1)' },
  ]
}
