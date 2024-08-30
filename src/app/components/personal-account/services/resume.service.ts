import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) { }
  
  private subscription: Subscription | null = null;

  private domain = 'https://vm-7c43f39f.na4u.ru/api';

  resumesList: any;

  getCardsData(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.domain}/resumes/ofCurrentUser`, { headers });
  }

  // Метод для создания подписки
  subscribeToGetCardsData(): void {
    this.subscription = this.getCardsData().subscribe(
      (response: any) => {
        this.resumesList = response; 
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных резюме:', error);
      }
    );
  }

  // Метод для отписки от подписки
  unsubscribeFromGetCardsData(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  setArchive(id: string, body: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/resumes/ofCurrentUser/${id}`, body, { headers });
  }

  deleteById(id: string) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.domain}/resumes/${id}`, { headers });
  }

  filterResumes(type: string): any[] {
    return this.resumesList.filter((resume: any) => resume.visibility == type);
  }

  // Метод для обновления списка резюме
  updateResumes(updatedResume: any) {
    this.resumesList = this.resumesList.map((resume: any) =>
      resume.id === updatedResume.id ? updatedResume : resume
    );
  }
}
