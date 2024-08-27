import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortetdFilterService {

  constructor(private http: HttpClient) { }

  visible: boolean = false;

  private domain = 'https://vm-18858982.na4u.ru/api'; 
   
  getTags(type: string): Observable<any> {
    return this.http.get(`${this.domain}/tags?types=${type}`);
  }


}
