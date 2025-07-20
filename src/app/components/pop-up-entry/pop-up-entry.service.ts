import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor(private http: HttpClient) { }

  visible: boolean = false;
  userVisible: boolean = false;
  isAuth: boolean = false;
  accessVerification: boolean = false;
  accessVerificationMessage: string = 'Почта успешно подтверждена';
  confirmAuth: boolean = false;
  private domain = `${environment.apiUrl}`;

  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/secured/users/currentUser`, { headers });
  }

  getRoot(): Observable<any> {
    return this.http.get(`${this.domain}/admins/rootToken`);
  }

  showDialog() {
    this.visible = true;
  }

  authUesr(data: any): Observable<any> {
    return this.http.post(`${this.domain}/auth/authorization-email`, data);
  }


  signUpUesr(data: any): Observable<any> {
    return this.http.post(`${this.domain}/auth/reg-email`, data);
  }

}
