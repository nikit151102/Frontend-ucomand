import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CreateEditProjectsService {

  constructor(private http: HttpClient) { }


  setNewProject(dataProject: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.apiUrl}/hackathons`, dataProject, { headers })

  }

  setEditProject(dataProject: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${environment.apiUrl}/hackathons/${dataProject.id}`, dataProject, { headers })

  }

  setAvatar(formData: any, endpoint: string, projectId: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${environment.apiUrl}/hackathons/${projectId}/${endpoint}`, formData, { headers, responseType: 'text' });
  }


}
