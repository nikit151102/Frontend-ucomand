import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  typeToggle: string = 'vacancy';
  vacancies: any;
  resumes: any;

  private domain = 'https://vm-7c43f39f.na4u.ru/api';


  getCardData(type: string): Observable<any> {
    let savedFilters: any = {};
    const filters = localStorage.getItem('bodyFilters');

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
    });
  }

  getResumes(){
    this.getCardData('resumes').subscribe(data => {
      this.resumes = data; 
    });
  }
  
  saveFilters(filters: any): void {
    localStorage.setItem('bodyFilters', JSON.stringify(filters));
  }

  clearFilters(): void {
    localStorage.removeItem('bodyFilters');
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

}