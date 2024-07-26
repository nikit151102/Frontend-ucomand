import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  authToken: boolean = false;

  getToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true
    }
    else {
      return false
    }
  }

  setToken() {
    localStorage.setItem('authToken', 'ваш_токен');
  }

  
}
