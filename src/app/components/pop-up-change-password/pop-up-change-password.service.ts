import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpChangePasswordService {

  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  // Экспортируем как Observable

  private domain = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  showPopup() {
    this.visibleSubject.next(true);  // Устанавливаем значение true
  }

  hidePopup() {
    this.visibleSubject.next(false); // Устанавливаем значение false
  }


  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const payload = {
      "oldPassword": currentPassword,
      "newPassword": newPassword
    };
    return this.http.post(`${this.domain}/secured/users/change-password-authorized-users`, payload, { headers });
  }


}
