import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private selectedProjectSubject = new BehaviorSubject<string | null>(null);
  selectedAvatar$ = this.selectedProjectSubject.asObservable();

  selectProject(project: string): void {
    this.selectedProjectSubject.next(project);
    console.log("Project", project)
  }

}

