import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarSelectionService {

  constructor(private http: HttpClient) { }

  private selectedAvatarSubject = new BehaviorSubject<string | null>(null);
  selectedAvatar$ = this.selectedAvatarSubject.asObservable();

  private selectedTypeAvatarSubject = new BehaviorSubject<string | null>(null);
  selectedTypeAvatar$ = this.selectedTypeAvatarSubject.asObservable();

  selectAvatar(avatar: string): void {
    this.selectedAvatarSubject.next(avatar);
    console.log("avatar", avatar)
  }

  selectGender(typeAvatar: string) {
    this.selectedTypeAvatarSubject.next(typeAvatar);
  }

  setAvatar(formData: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    
    const userDataString = sessionStorage.getItem('userData'); 
    if (userDataString) {
      const retrievedData = JSON.parse(userDataString);
      console.log(retrievedData);
  
      return this.http.put(`${environment.apiUrl}/users/${retrievedData.id}/avatar`, formData, { headers });
    } else {
      console.log('No user data found in sessionStorage.');
  
      return new Observable(observer => {
        observer.error('No user data found in sessionStorage.');
      });
    }
  }

}

