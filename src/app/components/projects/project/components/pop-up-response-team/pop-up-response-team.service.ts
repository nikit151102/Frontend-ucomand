import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { environment } from '../../../../../../environment';
import { ProjectService } from '../../project.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpResponseTeamService  implements OnInit{

  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();

  visibleResume = ''
  projectData: any;

  constructor(private http: HttpClient, private projectService: ProjectService) { }
 
  ngOnInit(): void {
    this.projectService.currentProjectData$.subscribe((value: any) => {
      this.projectData = value;
    })
  }

  showPopup() {
    this.visibleSubject.next(true);  // Устанавливаем значение true
  }

  hidePopup() {
    this.visibleSubject.next(false); // Устанавливаем значение false
  }


  private selectedtResumeSubject = new BehaviorSubject<any | null>(null);
  selectedResume$ = this.selectedtResumeSubject.asObservable();

  selectResume(resume: any): void {
    this.selectedtResumeSubject.next(resume);
  }

  getCardsData(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.apiUrl}/resumes/ofCurrentUser`, { headers });
  }

  filterResumes(type: string, list: any[]): any[] {
    return list.filter((resume: any) => resume.visibility === type);
  }

  setTeamProject(coverLetter: any) {
    const token = localStorage.getItem('authToken');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.selectedResume$.pipe(
      switchMap(resume => {
        const data = {
          "coverLetter": coverLetter,
          "resume": resume
        };
  
        return this.http.post(`${environment.apiUrl}/projects/${this.projectData.id}/applications`, data, { headers });
      })
    );
  }
  


}
