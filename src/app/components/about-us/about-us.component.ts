import { Component } from '@angular/core';
import { DestinyItemComponent } from './destiny-item/destiny-item.component';
import { CommonModule } from '@angular/common';
import { LineItemComponent } from './line-item/line-item.component';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, DestinyItemComponent, LineItemComponent, BackgroundImgsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  direction: string = 'left';
  tagsList = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'TypeScript', 'PHP', 'Swift', 'Kotlin',
    'Go', 'Rust', 'Dart', 'Objective-C', 'Scala', 'Perl', 'Lua', 'Haskell', 'MATLAB', 'R',
    'Elixir', 'F#', 'Clojure', 'Groovy', 'Visual Basic .NET', 'SQL', 'HTML', 'CSS', 'Sass', 'Less',
    'React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails',
    'ASP.NET', 'Express.js', 'NestJS', 'Laravel', 'Symfony', 'Meteor', 'Ember.js', 'Backbone.js', 'jQuery', 'Bootstrap'
  ];
  
  destinyList=[
    'владельцев IT-компаний/HR-менеджеров, которым нужны специалисты в штат',
    'людей с идеей, но нехваткой специалистов, которые смогут это реализовать',
    'специалистов IT-сферы, для того, чтобы найти команду или человека с идеей и вместе создать стартап',
    'молодых специалистов IT-сферы, которым необходима практика для применений знаний(курсов), которые они получили',
    'для специалистов сопутствующих специальностей - для работы компаний, даже в IT-сфере нужны не только программисты, им также доступна возможность найти специалиста или вакансию.'
  ];

  itemLineList=[
    {stroke: '#298cf4', color: 'linear-gradient(270deg, #298cf4 0%, rgba(41, 140, 244, 0.3) 100%)', width: 25, value: '1. Разработка и запуск Web-версии платформы UTeam.top с начальным функционалом (поиск/размещение резюме и вакансий) '},
    {stroke: '#23b9b0', color: 'linear-gradient(270deg, #23b9b0 0%, rgba(35, 185, 176, 0.3) 100%)', width: 28, value: '2. Мобильная версия Android/IOS'},
    {stroke: '#50b229', color: 'linear-gradient(270deg, #50b229 0%, rgba(80, 178, 41, 0.3) 100%)', width: 31, value: '3. Обновление, добавление разделов и функционала'},
    {stroke: '#806bff', color: 'linear-gradient(270deg, #806bff 0%, rgba(128, 107, 255, 0.3) 100%)', width: 33, value: '4. Создание Crypto-token.'},
    {stroke: '#cf87f1', color: 'linear-gradient(270deg, #cf87f1 0%, rgba(207, 135, 241, 0.3) 100%)', width: 36, value: '5. Telegram-app'},
    {stroke: '#ee5354', color: 'linear-gradient(270deg, #ee5354 0%, rgba(238, 83, 84, 0.3) 100%)', width: 39, value: '6. Раздача drop-box'},
    {stroke: '#ffab00', color: 'linear-gradient(270deg, #ffab00 0%, rgba(255, 171, 0, 0.3) 100%)', width: 42, value: '7. Обновление, добавление разделов и функционала'},
    {stroke: '#fad71e', color: 'linear-gradient(270deg, #fad71e 0%, rgba(250, 215, 30, 0.3) 100%)', width: 45, value: '8. Основное сжигание Crypto-token'},
    {stroke: '#fff25f', color: 'linear-gradient(270deg, #fff25f 0%, rgba(255, 242, 95, 0.3) 100%)', width: 48, value: '9. Листинг на DeFi'},
  ]
}
