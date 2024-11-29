import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  activeTab: 'aboutProject' | 'tape' = 'aboutProject'


  private currentProjectData: any = null;
  isEditProject: boolean = false;

  setProjectData(data: any): void {
    this.currentProjectData = data;
  }

  getProjectData(): any {
    return this.currentProjectData;
  }

  clearProjectData(): void {
    this.currentProjectData = null;
  }


  getCurrentProject(nicknameProject: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.apiUrl}/projects/byNickame/${nicknameProject}`, { headers })

  }


  getVacanciesProject(idProject: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const filters = {
      "visibilities": [
        "CREATOR_ONLY"
      ],
      "vacancyOwnerBanned": false
    }

    return this.http.post<any>(`${environment.apiUrl}/projects/${idProject}/vacancies/getByFilter?page=0&size=100`, filters, { headers })

  }


}
