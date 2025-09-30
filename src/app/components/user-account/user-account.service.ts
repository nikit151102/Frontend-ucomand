import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private domain = `${environment.apiUrl}`;
  private subscription = new Subscription(); 

  constructor(private http: HttpClient) { }

  getUserData(nickname: string): Observable<any> {
    return this.http.get(`${this.domain}/main/user/byNickname/${nickname}`);
  }

  getVacanciesData(id: string): Observable<any> {
    return this.http.post(`${this.domain}/main/vacancies/getAll?page=0&size=1000`, {"userId": id, "visibilities": [
    "EVERYBODY"
  ]});
  }

  getResumessData(id: string): Observable<any> {
    return this.http.post(`${this.domain}/main/resumes/getAll?page=0&size=1000`, {"userId": id, "visibilities": [
    "EVERYBODY"
  ]});
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
