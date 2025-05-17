import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class NewCommandService {

  constructor(private http: HttpClient) { }


  rejectCommand(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${environment.apiUrl}/applications/${id}/decline`, { headers })

  }


  addCommand(id: any, data: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.apiUrl}/hackathons/${id}/teams`, data, { headers })

  }

}
