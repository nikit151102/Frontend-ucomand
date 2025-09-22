import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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

setAvatar(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return throwError(() => new Error('No authentication token found'));
    }

    const userDataString = sessionStorage.getItem('userData');

    if (!userDataString) {
        return throwError(() => new Error('No user data found in sessionStorage'));
    }

    try {
        const retrievedData = JSON.parse(userDataString);
        console.log('Uploading avatar for user ID:', retrievedData.id);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
            // Не устанавливаем Content-Type - браузер сделает это автоматически для FormData
        });

        return this.http.post(
            `${environment.apiUrl}/secured/users/${retrievedData.id}/avatar`,
            formData,
            { 
                headers,
                responseType: 'text'  // Добавляем responseType в тот же объект
            }
        );
    } catch (error) {
        return throwError(() => new Error('Error parsing user data'));
    }
}

}

