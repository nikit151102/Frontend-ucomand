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
    this.http.get('http://5.181.253.239:8080/users/auth/telegram', { responseType: 'text' }).subscribe(scriptContent => {
      console.log("scriptContent", scriptContent);
  
      // Создаем элемент <script> с атрибутом src
      const script = document.createElement('script');
      script.id = 'telegram-widget-script';
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22'; // Устанавливаем src из содержимого
      script.setAttribute('data-telegram-login', 'uteamtestbot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
  
      // Вставляем скрипт в DOM
      document.getElementById('telegram-login')?.appendChild(script);
  
      // Убедитесь, что onTelegramAuth доступен глобально
      (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
    });
  }
  
  

  removeTelegramWidget() {
    const script = document.getElementById('telegram-widget-script');
    if (script) {
      script.remove();
    }
    (window as any).onTelegramAuth = undefined;
  }

  onTelegramAuth(user: any) {
    this.http.post('http://5.181.253.239:8080/auth/byTelegram', {
      id: user.id,
      hash: user.hash,
      username: user.username
    }).subscribe((response: any) => {
      console.log("response.token", response.token);
      this.tokenService.setToken(); // Передайте токен в метод setToken
      this.popUpEntryService.visible = false;
    });
  }

  login_enter() {
    this.popUpEntryService.visible = false;
    this.tokenService.setToken();
    // this.loadTelegramWidget();
  }

}
