import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  constructor(private http: HttpClient) { }

  private teamMembersSubject = new BehaviorSubject<any[]>([]); // Изначально пустой массив
  teamMembers$ = this.teamMembersSubject.asObservable(); // Открытое Observable для подписки

  // Метод для обновления teamMembers
  updateTeamMembers(newMembers: any[]) {
    this.teamMembersSubject.next(newMembers);
  }

  // Получение текущих данных
  getMembers() {
    return this.teamMembersSubject.getValue();
  }
  
  getTeamMembers(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.apiUrl}/projects/${id}/teamMembers`, {})
  }

  projectId:any;

  loadData(){
    this.getTeamMembers(this.projectId).subscribe((data: any) => {
      this.updateTeamMembers(data);
    })
  }
}
