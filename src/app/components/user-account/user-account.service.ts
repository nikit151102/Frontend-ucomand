import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private domain = 'https://vm-7c43f39f.na4u.ru/api';
  private subscription = new Subscription(); // Хранит активные подписки

  constructor(private http: HttpClient) { }

  getUserData(id: string): Observable<any> {
    return this.http.get(`${this.domain}/users/${id}`);
  }

  getVacanciesData(id: string): Observable<any> {
    return this.http.post(`${this.domain}/vacancies/getAll?page=0&size=1000`, {"userId": id});
  }

  getResumessData(id: string): Observable<any> {
    return this.http.post(`${this.domain}/resumes/getAll?page=0&size=1000`, {"userId": id});
  }

  subscribeToObservable(observable: Observable<any>, next: (data: any) => void, error?: (error: any) => void): void {
    const sub = observable.subscribe({
      next: next,
      error: error || ((err) => console.error(err))
    });

    this.subscription.add(sub);
  }

  
  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}