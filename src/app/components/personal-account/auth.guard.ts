import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from '../token.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private domain = environment.apiUrl;

  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    const nick = localStorage.getItem('userNickname');
    if (!token && nick) {
      this.tokenService.clearToken()
      localStorage.removeItem('userNickname');
      this.router.navigate(['/']); // Перенаправляем на главную страницу, если токена нет
      return of(false); // Возвращаем Observable с false
    }

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.domain}/secured/users/currentUser`, { headers }).pipe(
      map(() => true),  // Если данные возвращены успешно, возвращаем true
      catchError(() => {
        this.tokenService.clearToken()
        localStorage.removeItem('userNickname');
        this.router.navigate(['/']); // Перенаправляем на главную страницу
        return of(false); // Возвращаем Observable с false
      })
    );
  }
}
