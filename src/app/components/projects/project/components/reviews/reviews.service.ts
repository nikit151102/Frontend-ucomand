import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {



  private itemsListSubject = new BehaviorSubject<any[]>([]); // Начинаем с пустого массива
  itemsReviews$ = this.itemsListSubject.asObservable();
  projectId: any;
  
  setItemsList(values: any[]) {
    this.itemsListSubject.next(values);
  }
  
  removeItemById(id: any) {
    const currentItems = this.itemsListSubject.getValue(); // Получаем текущий массив
  
    if (!Array.isArray(currentItems) || currentItems.length === 0) return; // Проверяем, что это массив и он не пустой
  
    const updatedItems = currentItems.filter(item => item.id !== id); // Удаляем переданный id
    this.itemsListSubject.next(updatedItems); // Обновляем Subject
  }
  
  addItemToStart(newItem: any) {
    const currentItems = this.itemsListSubject.getValue(); // Получаем текущий массив
  
    if (!Array.isArray(currentItems)) return; // Проверяем, что это массив
  
    const updatedItems = [newItem, ...currentItems]; // Добавляем новый объект в начало массива
    this.itemsListSubject.next(updatedItems); // Обновляем Subject
  }
  
  updateItemById(id: any, updatedData: Partial<any>) {
    const currentItems = this.itemsListSubject.getValue(); // Получаем текущий массив
  
    if (!Array.isArray(currentItems) || currentItems.length === 0) return; // Проверяем, что это массив и он не пустой
  
    const updatedItems = currentItems.map(item => 
      item.id === id ? { ...item, ...updatedData } : item // Обновляем нужный объект
    );
  
    this.itemsListSubject.next(updatedItems); // Обновляем Subject
  }
    
  
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


  editComment(commentId: number, title: string, content: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const body = { title, content };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${environment.apiUrl}/comments/${commentId}`, body, {headers});
  }
}
