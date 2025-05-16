import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewApplicationComponent } from './new-application/new-application.component';
import { HackathonService } from '../../hackathon.service';

@Component({
  selector: 'app-hackathon-data',
  standalone: true,
  imports: [CommonModule, NewApplicationComponent],
  templateUrl: './hackathon-data.component.html',
  styleUrl: './hackathon-data.component.css'
})
export class HackathonDataComponent implements OnInit{

  dataHackathon: any;

  constructor(private hackathonService:HackathonService){}

  ngOnInit(): void {
    this.hackathonService.currentProjectData$.subscribe((data: any)=>{
      this.dataHackathon = data;
    })
  }


  getFormatText(format: string): string {
    switch(format) {
      case 'ONLINE': return 'онлайн';
      case 'OFFLINE': return 'оффлайн';
      case 'HYBRID': return 'онлайн + оффлайн';
      default: return 'Неизвестный формат';
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

}
