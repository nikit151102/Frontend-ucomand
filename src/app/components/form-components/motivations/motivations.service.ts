import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotivationsService {

  constructor(private http: HttpClient) { }

  private domain = 'https://vm-7c43f39f.na4u.ru/api';

  getTags(): Observable<any> {
    return this.http.get(`${this.domain}/tags?types=MOTIVATION`);
  }
  
}