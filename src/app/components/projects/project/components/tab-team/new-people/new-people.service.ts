import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPeopleService {

  constructor(private http: HttpClient) { }

  getNewPeopleService(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.apiUrl}/projects/${id}/applications/getByFilter?page=0&size=100`, {}, {headers})

  }


  setNewPeopleDecline(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${environment.apiUrl}/applications/${id}/decline`, { headers })

  }

  setApplication(projectId: any, applicationId: any) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.apiUrl}/projects/${projectId}/teamMembers?applicationId=${applicationId}`, { }, {headers})

  }

}
