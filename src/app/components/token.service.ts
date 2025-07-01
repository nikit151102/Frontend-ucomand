import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authTokenSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.authTokenSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isAuthenticated$ = this.authTokenSubject.asObservable();
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  getToken(): boolean {
    return this.authTokenSubject.value;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
    this.authTokenSubject.next(true);
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
    this.authTokenSubject.next(false);
  }
}