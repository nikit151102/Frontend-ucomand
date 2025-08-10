import { Component, AfterViewInit, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PopUpEntryService } from './pop-up-entry.service';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forbiddenWordsValidator } from '../personal-account/personal-data/errorNameList';

@Component({
  selector: 'app-pop-up-entry',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pop-up-entry.component.html',
  styleUrls: ['./pop-up-entry.component.css']
})
export class PopUpEntryComponent implements AfterViewInit, OnDestroy, OnInit {

  authForm: FormGroup;
  isError: boolean = false;
  constructor(
    public popUpEntryService: PopUpEntryService,
    private tokenService: TokenService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telegram: ['', [Validators.required, forbiddenWordsValidator()]],
      // nickname: ['', [Validators.required, forbiddenWordsValidator()]],
      // password: ['', [Validators.required, forbiddenWordsValidator()]],
    });
  }

  setVisibleError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }



  getLoginForm() {
    this.popUpEntryService.confirmAuth = false;
    this.popUpEntryService.accessVerification = true;
    this.popUpEntryService.isAuth == false;
  }

  authUser() {

    const formData = this.authForm.value;
    console.log('formData', formData)
    const data = { ...formData };

    console.log('this.popUpEntryService.isAuth', this.popUpEntryService.isAuth)
    if (this.popUpEntryService.isAuth === true) {
      delete data.telegram;
    }

    // if (this.popUpEntryService.isAuth === true) {
    //   this.popUpEntryService.authUesr(data).subscribe((response: any) => {
    //     console.log('Auth response from backend:', response);
    //     this.tokenService.setToken(response.token);
    //     localStorage.setItem('userNickname', response.nickname);
    //     this.userAuthenticated = true;
    //     this.login_user();
    //   })
    // } else {
    this.popUpEntryService.signUpUesr(data).subscribe((response: any) => {
      this.popUpEntryService.confirmAuth = true;
      // console.log('Auth response from backend:', response);
      // this.tokenService.setToken(response.token);
      // this.userAuthenticated = true;
      // this.login_user();
    })
    // }
  }


  private domain = `${environment.apiUrl}`;
  telegramWidgetLoaded: boolean = false;
  userAuthenticated: boolean = false;
  errorMessage: string = '';

  ngAfterViewInit() {
    if (this.popUpEntryService.visible) {
      this.loadTelegramWidget();
    }
    this.popUpEntryService.confirmAuth = false;
  }
  ngOnInit() {
    // this.loadTelegramWidget()
  }

  ngOnDestroy() {
    this.telegramWidgetLoaded = false;
    this.removeTelegramWidget();
  }

  loadTelegramWidget() {
    if (!document.getElementById('telegram-widget-script')) {
      const script = document.createElement('script');
      script.id = 'telegram-widget-script';
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', `${environment.userNameBot}`);
      script.setAttribute('data-size', 'large');
      // script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-auth-url', `${this.domain}/secured/users/auth/byTelegram`);
      script.setAttribute('data-request-access', 'write');
      script.onload = () => {
        // Этот код сработает после загрузки виджета
        console.log('Telegram Widget loaded');

      }
      document.getElementById('telegram-login')?.appendChild(script);

      // Ensure onTelegramAuth is available globally
      // (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
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
    console.log('Received Telegram user data:', user);
    if (user.username) {
      this.http.post(`${this.domain}/secured/users/auth/byTelegram`, user, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (response: any) => {
          console.log('Auth response from backend:', response);
          this.tokenService.setToken(response.token);
          this.userAuthenticated = true;
          this.login_user();
        },
        (error) => {
          console.error('Error during Telegram auth request:', error);
          this.errorMessage = 'Ошибка авторизации через Telegram';
        }
      );
      this.closePopUp();
    } else {
      this.errorMessage = 'Пожалуйста, заполните имя пользователя в Telegram';
    }
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
    const token = this.tokenService.getToken();
    this.popUpEntryService.getUser().subscribe(
      (data) => {
        const firstNameValid = typeof data.firstName === 'string' && data.firstName.trim() !== '';
        const lastNameValid = typeof data.lastName === 'string' && data.lastName.trim() !== '';
        const genderValid = typeof data.gender === 'string' && data.gender.trim() !== '';
        const ageValid = typeof data.age === 'number' && data.age > 0;
        const cityOfResidenceValid = typeof data.cityOfResidence !== null;
        const emailValid = typeof data.email === 'string' && data.email.trim() !== '';

        // if (!firstNameValid) {
        //   console.error('Invalid first name:', data.firstName);
        // }
        // if (!lastNameValid) {
        //   console.error('Invalid last name:', data.lastName);
        // }
        // if (!genderValid) {
        //   console.error('Invalid gender:', data.gender);
        // }
        // if (!ageValid) {
        //   console.error('Invalid age:', data.age);
        // }
        // if (!cityOfResidenceValid) {
        //   console.error('Invalid city of residence:', data.cityOfResidence);
        // }
        // if (!emailValid) {
        //   console.error('Invalid email:', data.email);
        // }

        const isDataValid = firstNameValid && lastNameValid && genderValid && ageValid && cityOfResidenceValid && emailValid;

        // true -> b326b5062b2f0e69046810717534cb09

        if (!isDataValid) {
          localStorage.setItem('fullAccess', 'we26b502b2fe32e69046810717534b32d');
        } else {
          localStorage.setItem('fullAccess', 'b326b5062b2f0e69046810717534cb09');
        }
        localStorage.setItem('Linkken', data.imageLink);
        localStorage.setItem('userNickname', data.nickname);
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.popUpEntryService.userVisible = true;
        this.popUpEntryService.visible = false;
        this.closePopUp()
      },
      (error) => {
      }
    );
    this.closePopUp()
  }



  closePopUp() {
    this.popUpEntryService.visible = false;
    this.telegramWidgetLoaded = false;
    this.removeTelegramWidget();
    this.errorMessage = '';
  }

  clearCookies() {
    const cookies = document.cookie.split(';');

    // Loop through the cookies and delete each one
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      // Setting the cookie expiration date to the past will delete it
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }


  @ViewChild('digit1') digit1!: ElementRef;
  @ViewChild('digit2') digit2!: ElementRef;
  @ViewChild('digit3') digit3!: ElementRef;
  @ViewChild('digit4') digit4!: ElementRef;
  @ViewChild('digit5') digit5!: ElementRef;
  @ViewChild('digit6') digit6!: ElementRef;

  moveFocus(event: any, nextField: number) {
    const input = event.target;
    if (input.value.length === 1) {
      switch (nextField) {
        case 1: this.digit2.nativeElement.focus(); break;
        case 2: this.digit3.nativeElement.focus(); break;
        case 3: this.digit4.nativeElement.focus(); break;
        case 4: this.digit5.nativeElement.focus(); break;
        case 5: this.digit6.nativeElement.focus(); break;
        case 6: this.verifyCode(); break;
      }
    }
  }

  verifyCode() {
    const code = this.digit1.nativeElement.value +
      this.digit2.nativeElement.value +
      this.digit3.nativeElement.value +
      this.digit4.nativeElement.value +
      this.digit5.nativeElement.value +
      this.digit6.nativeElement.value

    const formData = this.authForm.value;
    formData.password = code;
    const data = { ...formData };
    console.log('data', data)
    this.popUpEntryService.authUesr(data).subscribe((response: any) => {
      console.log('Auth response from backend:', response);
      this.tokenService.setToken(response.token);
      localStorage.setItem('userNickname', response.nickname);
      this.userAuthenticated = true;
      this.popUpEntryService.visible = false;
      //     this.tokenService.setToken(response.token);
      //     localStorage.setItem('userNickname', response.nickname);
      //     this.userAuthenticated = true;
      //     this.login_user();
    })

    // Здесь добавьте логику проверки кода
    console.log('Введенный код:', code);
  }

}
