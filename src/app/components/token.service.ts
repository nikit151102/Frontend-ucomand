import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authTokenSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authTokenSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false; // Fallback if localStorage is unavailable
  }

  getToken(): boolean {
    return this.authTokenSubject.value;
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
    this.authTokenSubject.next(true);
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.authTokenSubject.next(false);
  }
}