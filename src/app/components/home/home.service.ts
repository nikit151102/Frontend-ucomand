import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

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
  
  private domain = 'https://vm-7c43f39f.na4u.ru/api';

  changeTheme(theme: string) {
    this.themeSubject.next(theme);
  }

  getCardData(type: string): Observable<any> {
    let savedFilters: any = {};
    const filters = sessionStorage.getItem('bodyFilters');

    if (filters) {
      savedFilters = JSON.parse(filters);
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
    },(error:any) => { 
      if (error.status) {
      this.router.navigate(['/error', { num: error.status }]);
    } else {
      this.router.navigate(['/error', { num: 500 }]);
    }});
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
    setTimeout(() => {
      this.getVacancies();
      this.getResumes();
      this.toggleSortDirection();
      this.loading = false; 
    }, 1000);
  }

  loading: boolean = true;
  toggleType(type: any){
    this.typeToggle = type;
    this.loading = true;
    setTimeout(() => {
      this.getVacancies();
      this.getResumes();
      this.toggleSortDirection();
      this.loading = false; 
    }, 1000);
  }


}