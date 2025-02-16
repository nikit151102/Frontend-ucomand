import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

 constructor(private http: HttpClient) { }

   getTeamMembers(id: string): Observable<any> {
     const token = localStorage.getItem('authToken');
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.get<any>(`${environment.apiUrl}/projects/${id}/teamMembers`, {})
     
   }
}
