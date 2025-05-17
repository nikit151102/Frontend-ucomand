import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CollectingApplicationsService {

  constructor(private http: HttpClient) { }


  getCardProjects() {

    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/projects/getByFilter`, {}, { headers });

  }
}
