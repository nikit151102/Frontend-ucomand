import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  // 📌 Получить список комментариев
  getComments(projectId: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/comments?page=${page}&size=${size}`);
  }

  // 📌 Добавить комментарий
  addComment(projectId: number, title: string, content: string): Observable<any> {
    const body = { title, content };
        const token = localStorage.getItem('authToken');
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/comments`, body, {headers});
  }

  // 📌 Удалить комментарий
  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.apiUrl}/comments/${commentId}`, {headers});
  }
}
