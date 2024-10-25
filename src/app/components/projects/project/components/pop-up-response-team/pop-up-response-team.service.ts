import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpResponseTeamService {

  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  

  visibleResume = ''

  constructor() { }

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

}
