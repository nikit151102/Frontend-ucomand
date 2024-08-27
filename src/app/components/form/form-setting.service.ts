import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSettingService {

  constructor(private http: HttpClient) { }

  typeForm: string = '';
  title: string = '';

  isEdit: boolean = false;
  isheading: boolean = false;

  visible: boolean = false;

  private domain = 'https://vm-7c43f39f.na4u.ru/api'; 
   
  getTags(type: string): Observable<any> {
    return this.http.get(`${this.domain}/tags?types=${type}`);
  }
}
