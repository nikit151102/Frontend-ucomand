import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class HackathonService {

  constructor(private http: HttpClient) { }

  activeTab: 'aboutProject' | 'tape' | 'myTeam' = 'aboutProject'


  private currentProjectDataSubject = new BehaviorSubject<any>(null);

  // Observable for project data
  public currentProjectData$: Observable<any> = this.currentProjectDataSubject.asObservable();

  // Method to update the project data
  setCurrentProjectData(data: any): void {
    this.currentProjectDataSubject.next(data);
  }

  // Method to get the latest project data
  getCurrentProjectData(): any {
    return this.currentProjectDataSubject.getValue();
  }

  clearCurrentProjectData(): void {
    this.currentProjectDataSubject.next(null);
  }

  // Метод для изменения поля currentUserAppliedToProject на true
  updateUserAppliedStatus(): void {
    const currentData = this.getCurrentProjectData();

    if (currentData && currentData.hasOwnProperty('currentUserAppliedToProject')) {
      currentData.currentUserAppliedToProject = true;
      this.setCurrentProjectData(currentData);
    } else {
      console.warn('Данные проекта или поле currentUserAppliedToProject не найдены');
    }
  }



  private currentProjectVacanciesSubject = new BehaviorSubject<any>(null);

  public currentProjectVacancies$: Observable<any> = this.currentProjectVacanciesSubject.asObservable();

  setCurrentProjectVacancies(data: any): void {
    this.currentProjectVacanciesSubject.next(data);
  }

  getCurrentProjectVacancies(): any {
    return this.currentProjectVacanciesSubject.getValue();
  }

  clearCurrentProjectVacancies(): void {
    this.currentProjectVacanciesSubject.next(null);
  }



  private currentProjectIsOwnerSubject = new BehaviorSubject<boolean>(false);

  public currentProjectIsOwner$: Observable<any> = this.currentProjectIsOwnerSubject.asObservable();


  setCurrentProjectIsOwner(data: boolean): void {
    this.currentProjectIsOwnerSubject.next(data);
  }

  getCurrentProjectIsOwner(): any {
    return this.currentProjectIsOwnerSubject.getValue();
  }


  isEditProject: boolean = false;
  page: any = 'home';

  getCurrentHackathon(nicknameProject: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(token){
      return this.http.get<any>(`${environment.apiUrl}/hackathons/byNickname/${nicknameProject}`, { headers })
    }else{
      return this.http.get<any>(`${environment.apiUrl}/hackathons/byNickname/${nicknameProject}`)
    }
  }


  getVacanciesProject(idProject: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const filters = {

    }

    return this.http.post<any>(`${environment.apiUrl}/projects/${idProject}/vacancies/getByFilter?page=0&size=100`, filters, { headers })

  }


}
