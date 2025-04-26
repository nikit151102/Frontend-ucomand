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
export class ScreensaverHackComponent implements OnInit{

  @Input() detailsList: any;
  avatarLink: string = ''
  isOwner: boolean = false;
  constructor(private router: Router, private hackathonService: HackathonService) { }
  
  ngOnInit(): void {
    this.setTargetAvata('https://avatars.mds.yandex.net/i?id=f53805ab42a551a591544fa2a4c3e54e_l-4600590-images-thumbs&n=13', 'overlay');
    this.hackathonService.currentProjectData$.subscribe((value: any) => {
      if (value && value.headerLink) { // Проверяем, что value не null/undefined
        // this.setTargetAvata(value.headerLink, 'overlay');
        
        this.avatarLink = value.avatarLink || ''; // Защита от undefined
      }
    });
    this.hackathonService.currentProjectIsOwner$.subscribe((value: boolean)=>{
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

  setTargetAvata(objectUrl: string, block:string) {
    const backgroundContainer = document.querySelector(`.${block}`) as HTMLElement;
    if (backgroundContainer) {
      backgroundContainer.style.backgroundImage = `url(${objectUrl})`;
      backgroundContainer.style.backgroundSize = 'cover';
      backgroundContainer.style.backgroundPosition = 'center';
    }
  }

}
