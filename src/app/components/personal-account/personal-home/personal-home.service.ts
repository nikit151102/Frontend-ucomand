import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalHomeService {

  constructor(private http: HttpClient) { }
  
  private domain = 'http://5.181.253.239:8080';

  getCardsData(typeCard: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.domain}/${typeCard}/ofCurrentUser`,  { headers });
  }

}
