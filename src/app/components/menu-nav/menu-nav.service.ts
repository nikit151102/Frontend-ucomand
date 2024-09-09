import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuNavService {
  private localStorageKey = 'Linkken';
  private storageSubject = new BehaviorSubject<string>(this.getFromLocalStorage());

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.localStorageKey) {
        this.storageSubject.next(this.getFromLocalStorage());
      }
    });
  }

  private getFromLocalStorage(): string {
    return localStorage.getItem(this.localStorageKey) || '';
  }

  getStorageValue() {
    return this.storageSubject.asObservable();
  }

  setStorageValue(newValue: string) {
    localStorage.setItem(this.localStorageKey, newValue);
    this.storageSubject.next(newValue);
  }
}