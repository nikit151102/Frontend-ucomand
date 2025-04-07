import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private subscription: Subscription | null = null;
  projectsList: any[] = [];
  activeProjects: any[] = [];
  archiveProjects: any[] = [];
  constructor(private http: HttpClient) { }


  getCardsData(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.apiUrl}/projects/userProfile`, { headers });
  }

  filterProjects(type: string): any[] {
    return this.projectsList.filter((resume: any) => resume.visibility === type);
  }

  subscribeToGetCardsData(): void {
    this.subscription = this.getCardsData().subscribe(
      (response: any) => {
        this.projectsList = response;
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных резюме:', error);
      }
    );
  }

}
