import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';
import { PopUpEntryService } from '../../pop-up-entry/pop-up-entry.service';

@Component({
  selector: 'app-hackathon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hackathon-cad.component.html',
  styleUrl: './hackathon-cad.component.css'
})
export class HackathonCadComponent {

  @Input() cardItem: any;
  isLiked = false;

  constructor(private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private popUpEntryService: PopUpEntryService) { }

  type: any[] = [
    { name: 'Стартап', type: 'STARTUP' },
    { name: 'Компания', type: 'COMPANY' },
    { name: 'Разовый проект', type: 'ONE_TIME_PROJECT' },
  ];

  getTypeName(type: string): string {
    const found = this.type.find(item => item.type === type);
    return found ? found.name : 'Неизвестный тип';
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

  toggleLike(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    let userData = localStorage.getItem('authToken');
    let userNickname = localStorage.getItem('autuserNicknamehToken');
    if (!userData && !userNickname) {
      this.popUpEntryService.showDialog();
      return;
    }
    const url = `${environment.apiUrl}/projects/${this.cardItem.id}/like`;
    const method = 'PUT';
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.request(method, url, { headers }).subscribe(() => {
      this.cardItem.userLike = !this.cardItem.userLike;
      this.cardItem.likesCount += this.cardItem.userLike ? 1 : -1;
      this.cdr.detectChanges();
    }, error => {
      console.error('Ошибка при отправке лайка:', error);
    });
  }

  viewUser(event: Event, id: string) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate([``, id]);
  }

  viewJob(event: Event, id: string) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate([`/vacancy/`, id]);
  }
}
