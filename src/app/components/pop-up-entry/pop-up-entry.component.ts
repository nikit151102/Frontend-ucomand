import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
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
export class PopUpEntryComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(
    public popUpEntryService: PopUpEntryService,
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  telegramWidgetLoaded: boolean = false;

  ngAfterViewInit() {
    if (this.popUpEntryService.visible) {
      this.loadTelegramWidget();
    }
  }
  ngOnInit() {
    // this.loadTelegramWidget()
  }

  ngOnDestroy() {
    this.removeTelegramWidget();
  }

  loadTelegramWidget() {
    if (!document.getElementById('telegram-widget-script')) {
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
      this.telegramWidgetLoaded = true;
    }
  }



  removeTelegramWidget() {
    const script = document.getElementById('telegram-widget-script');
    if (script) {
      script.remove();
    }
    (window as any).onTelegramAuth = undefined;
    this.telegramWidgetLoaded = false;
  }

  onTelegramAuth(user: any) {
    console.log("Telegram User Data:", user);

    // Отправка запроса на ваш сервер для аутентификации
    this.http.post('https://vm-7c43f39f.na4u.ru/api/users/auth/byTelegram', user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      console.log("response", response);
      console.log("response.token", response.token);
      this.tokenService.setToken(response.token);

      // Запрос аватарки
      this.getTelegramUserProfilePhotos(user.id).subscribe(
        (photoData) => {
          console.log('User avatar data:', photoData);
          const userPhotoUrl = this.extractLargestPhoto(photoData);
          console.log("userPhotoUrl",userPhotoUrl)
          // Используйте URL для отображения фото профиля
        },
        (error) => {
          console.error('Error fetching user avatar:', error);
        }
      );

      this.popUpEntryService.getUser().subscribe(
        (data) => {
          this.tokenService.setToken(data.token);
          console.log('User data:', data.token);
          this.login_user()
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    });
  }

  // Метод для получения фотографии профиля пользователя Telegram
  getTelegramUserProfilePhotos(userId: number) {
    const botToken = 'YOUR_BOT_TOKEN'; // замените на токен вашего бота
    const apiUrl = `https://api.telegram.org/bot5547226280:AAER7OzBYfDejmrk5BGYBNpwzkPmnDhodTc/getUserProfilePhotos?user_id=${userId}`;

    return this.http.get(apiUrl);
  }

  // Метод для извлечения самой большой фотографии из ответа
  extractLargestPhoto(photoData: any) {
    if (photoData && photoData.result && photoData.result.photos && photoData.result.photos.length > 0) {
      const photos = photoData.result.photos;
      const largestPhoto = photos[0][photos[0].length - 1]; // Обычно, последняя фотография в массиве является самой большой
      return `https://api.telegram.org/file/bot<YOUR_BOT_TOKEN>/${largestPhoto.file_path}`;
    }
    return null;
  }
  
  login_enter() {
    this.popUpEntryService.visible = false;

    this.popUpEntryService.getRoot().subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        console.log('User data:', data.token);

        this.popUpEntryService.userVisible = true;
        this.popUpEntryService.visible = false;
        this.login_user()
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

  }

  login_user() {
    this.popUpEntryService.visible = false;

    this.popUpEntryService.getUser().subscribe(
      (data) => {
        localStorage.setItem('userId', data.id);
        this.popUpEntryService.userVisible = true;
        this.popUpEntryService.visible = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }



  closePopUp() {
    this.popUpEntryService.visible = false;
  }
}
