import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpResponseTeamService {

  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  

  visibleResume = ''

  constructor(private http: HttpClient) { }

  showPopup() {
    this.visibleSubject.next(true);  // Устанавливаем значение true
  }

  hidePopup() {
    this.visibleSubject.next(false); // Устанавливаем значение false
  }


  private selectedtResumeSubject = new BehaviorSubject<any | null>(null);
  selectedResume$ = this.selectedtResumeSubject.asObservable();
  
  selectResume(resume: string): void {
    this.selectedtResumeSubject.next(resume);
  }

  getCardsData(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.apiUrl}/resumes/ofCurrentUser`, { headers });
  }

  filterResumes(type: string, list:any[]): any[] {
    return list.filter((resume: any) => resume.visibility === type);
  }


}
