import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authTokenSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authTokenSubject.asObservable();

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): boolean {
    return this.authTokenSubject.value;
  }

  setToken(): void {
    localStorage.setItem('authToken', 'ваш_токен');
    this.authTokenSubject.next(true);
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    this.authTokenSubject.next(false);
  }
}
