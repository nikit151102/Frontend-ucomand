import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,  private router: Router) { }

  typeToggle: string = 'vacancy';
  vacancies: any;
  resumes: any;

  private themeSubject = new BehaviorSubject<string>(localStorage.getItem('theme') || 'light');
  activeTheme$ = this.themeSubject.asObservable();
  
  private domain = `${environment.apiUrl}`;

  changeTheme(theme: string) {
    this.themeSubject.next(theme);
  }

  getCardData(type: string): Observable<any> {
    let savedFilters: any = {};
    const filters = sessionStorage.getItem('bodyFilters');

    if (filters) {
      savedFilters = JSON.parse(filters);
      console.log("savedFilters",savedFilters)
    } else {
      savedFilters = {
        "visibilities": ["CREATOR_ONLY"]
      };
      this.saveFilters(savedFilters);
    }
    const typeSort = localStorage.getItem('typeSort');
    const queryParams = `page=0&size=60&sorts=${typeSort}`;
   
    return this.http.post(`${this.domain}/${type}/getAll?${queryParams}`, savedFilters);
  }

  getVacancies(){
    this.getCardData('vacancies').subscribe(data => {
      this.vacancies = data; 
      console.log("data,",data)
    })
  }

  getResumes(){
    this.getCardData('resumes').subscribe(data => {
      this.resumes = data; 
    });
  }
  
  saveFilters(filters: any): void {
    sessionStorage.setItem('bodyFilters', JSON.stringify(filters));
  }

  clearFilters(): void {
    sessionStorage.removeItem('bodyFilters');
  }

  toggleSortDirection(): void {
    let currentSort = localStorage.getItem('typeSort');
    if (currentSort) {
      currentSort = currentSort === 'creationDate_desc' ? 'creationDate' : 'creationDate_desc';
    } else {
      currentSort = 'creationDate_desc';
    }
    localStorage.setItem('typeSort', currentSort);
  }

  toggleSort(sortItem: string): void {
    localStorage.setItem('typeSort', sortItem);
  }

  saveSort(sort: string): void {
    localStorage.setItem('sort', sort);
  }
  

  loadData() {
      this.getVacancies();
      this.getResumes();
      this.toggleSortDirection();
      this.loading = false; 
  }

  loading: boolean = true;
  
  toggleType(type: any){
    this.typeToggle = type;
    this.loading = true;
      this.getVacancies();
      this.getResumes();
      this.toggleSortDirection();
      this.loading = false; 
  }


}