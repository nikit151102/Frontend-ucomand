import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HackathonService } from '../../hackathon.service';

@Component({
  selector: 'app-screensaver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screensaver.component.html',
  styleUrl: './screensaver.component.css'
})
export class ScreensaverHackComponent implements OnInit {

  detailsList: any;
  avatarLink: string = ''
  isOwner: boolean = false;
  constructor(private router: Router, private hackathonService: HackathonService) { }

  ngOnInit(): void {

    this.hackathonService.currentProjectData$.subscribe((value: any) => {
      if (value && value.imageLink) { // Проверяем, что value не null/undefined
        this.setTargetAvata(value.imageLink, 'overlay');
        this.detailsList = value;
        this.avatarLink = value.avatarLink || ''; // Защита от undefined
      }
    });
    this.hackathonService.currentProjectIsOwner$.subscribe((value: boolean) => {
      this.isOwner = value;
    })

  }

  tags = [{ name: 'Стартап', type: 'STARTUP' }, { name: 'Компания', type: 'COMPANY' }, { name: 'Разовый проект', type: 'ONE_TIME_PROJECT' }]

  getTagName(type: string): string {
    const tag = this.tags.find(tag => tag.type === type);
    return tag ? tag.name : '';
  }

  getEditProject() {
    this.hackathonService.currentProjectData$.subscribe((value: any) => {
      this.router.navigate(['editProject', value.nickname]);
      this.hackathonService.isEditProject = true;
    })

  }

  setTargetAvata(objectUrl: string, block: string) {
    const backgroundContainer = document.querySelector(`.${block}`) as HTMLElement;
    if (backgroundContainer) {
      backgroundContainer.style.backgroundImage = `url(${objectUrl})`;
      backgroundContainer.style.backgroundSize = 'cover';
      backgroundContainer.style.backgroundPosition = 'center';
    }
  }

  formatRussianDate(date: Date | string): string {
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month}`;
  }

  getRegistrationStatusText(status: string): string {
    console.log('status',status)
    switch (status) {
      case 'OPEN': return 'Регистрация открыта';
      case 'CLOSED': return 'Регистрация закончена';
      case 'PENDING': return `Регистрация с ${this.formatRussianDate(this.detailsList.endDate)}`;
      default: return '';
    }
  }

}
