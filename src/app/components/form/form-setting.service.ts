import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

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

  private domain = `${environment.apiUrl}`;

  getTags(type: string): Observable<any> {
    return this.http.get(`${this.domain}/tags?types=${type}`);
  }

  setData(type: string, data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.domain}/${type}/forCurrentUser`, data, { headers });
  }


  getDataById(type: string, id: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/${type}/${id}`, { headers });
  }


  putDataById(type: string, data: any, id: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.domain}/${type}/${id}`, data, { headers });
  }

  deleteData(type: string, id: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.domain}/${type}/${id}`, { headers });
  }

  addToProject(idVacancy: number, idProject: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.domain}/projects/${idProject}/addVacancies`, [idVacancy], { headers });
  }

}
