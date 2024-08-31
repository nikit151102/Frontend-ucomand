import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  typeToggle: string = 'vacancy';


  private domain = 'https://vm-7c43f39f.na4u.ru/api';


  getCardData(type: string): Observable<any> {
    let savedFilters: any = {};
    const filters = localStorage.getItem('bodyFilters');
    if (filters) {
      savedFilters = JSON.parse(filters);
    }

    return this.http.post(`${this.domain}/${type}/getAll?page=0&size=60`, savedFilters);
  }

  saveFilters(filters: any): void {
    localStorage.setItem('bodyFilters', JSON.stringify(filters));
  }

  clearFilters(): void {
    localStorage.removeItem('bodyFilters');
  }
}