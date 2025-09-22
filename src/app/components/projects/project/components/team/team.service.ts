import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

    getTeamProject(idProject: any): Observable<any> {
  
      return this.http.get<any>(`${environment.apiUrl}/main/project/${idProject}/teamMembers`,)
  
    }
}
