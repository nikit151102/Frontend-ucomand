import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TapeService {

  constructor(private http: HttpClient) { }


  private itemsListSubject = new BehaviorSubject<any>(null);
  itemsList$ = this.itemsListSubject.asObservable();
  projectId: any;

  setItemsList(values: any) {
    this.itemsListSubject.next(values);
  }

  getTapes(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/projects/${id}/posts?page=0&size=10`, {})
  }


  setPost(id: string, title: string, content: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      title: title,
      imageLink: "",
      content: content
    };

    return this.http.post<any>(`${environment.apiUrl}/projects/${id}/posts`, body, { headers });
  }



  uploadPostImage(postId: string, file: File): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('image', file);

    return this.http.put<any>(`${environment.apiUrl}/posts/${postId}/image`, formData, { headers });
  }


  deletePost(postId: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${environment.apiUrl}/projects/${postId}/posts`, { headers });
  }


}
