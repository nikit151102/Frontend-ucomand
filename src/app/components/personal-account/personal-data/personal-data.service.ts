import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './user-interface';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  
  constructor(private http: HttpClient) { }

  visible: boolean = false;

  private domain = `${environment.apiUrl}`;
   
  getCities(): Observable<any> {
    return this.http.get(`${this.domain}/main/cities`);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Выполнение запроса с заголовками
    return this.http.get(`${this.domain}/secured/users/currentUser`, { headers });
  }

  updateUser(user: User): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.domain}/secured/users/currentUser`, user,  { headers }); // Обновите URL в соответствии с вашим API
  }

  validatorDomain(name:string){
    return this.http.get<{ isAvailable: boolean }>(`${this.domain}/secured/users/nicknames/${name}/isAvailable`);
  }

}
