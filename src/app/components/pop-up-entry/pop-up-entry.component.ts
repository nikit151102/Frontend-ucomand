import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { PopUpEntryService } from './pop-up-entry.service';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pop-up-entry',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './pop-up-entry.component.html',
  styleUrls: ['./pop-up-entry.component.css']
})
export class PopUpEntryComponent implements AfterViewInit, OnDestroy {

  constructor(
    public popUpEntryService: PopUpEntryService,
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    this.loadTelegramWidget();
  }

  ngOnDestroy() {
    this.removeTelegramWidget();
  }

  loadTelegramWidget() {
    const script = document.createElement('script');
    script.id = 'telegram-widget-script';
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'Trireibot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');

    document.getElementById('telegram-login')?.appendChild(script);

    // Ensure onTelegramAuth is available globally
    (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
  }
  
  

  removeTelegramWidget() {
    const script = document.getElementById('telegram-widget-script');
    if (script) {
      script.remove();
    }
    (window as any).onTelegramAuth = undefined;
  }

  onTelegramAuth(user: any) {
    console.log("Telegram User Data:", user);
    this.http.post('https://vm-7c43f39f.na4u.ru/api/users/auth/byTelegram', {
      id: user.id,
      hash: user.hash,
      username: user.username,
      auth_date: user.auth_date,
      first_name: user.first_name
    }).subscribe((response: any) => {
      console.log("response", response);
      console.log("response.token", response.token);
      this.tokenService.setToken(response.token);
      // this.tokenService.setToken(); // Передайте токен в метод setToken
      this.popUpEntryService.visible = false;
    });
  }

  login_enter() {
    this.popUpEntryService.visible = false;

    this.popUpEntryService.getUser().subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        console.log('User data:', data.token);
        this.popUpEntryService.userVisible = true;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    // this.loadTelegramWidget();
  }

}
