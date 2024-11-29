import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private router: Router) { }

  typeToggle: string = 'vacancy';
  vacancies: any[] = [];
  resumes: any[] = [];
  loading: boolean = true;
  selectPage: number = 0;
  visibleNextPage: boolean = false;
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
    } else {
      savedFilters = {
        "visibilities": ["EVERYBODY"]
      };
      this.saveFilters(savedFilters);
    }

    const typeSort = localStorage.getItem('typeSort');
    const queryParams = `page=${this.selectPage}&size=30&sorts=creationDate_desc`;

    return this.http.post(`${this.domain}/${type}/getAll?${queryParams}`, savedFilters);
  }

  getVacancies() {
    this.getCardData('vacancies').subscribe(data => {
      if (data) {
        const filteredData = data.filter((vacancy:any) => vacancy.visibility !== "BAN");
      
      if (filteredData.length === 30) {
        this.visibleNextPage = true;
      } else {
        this.visibleNextPage = false;
      }
      
      this.selectPage = this.selectPage + 1;
      this.vacancies = [...this.vacancies, ...filteredData];
      }
      this.loading = false;
    })
  }

  getResumes() {
    this.getCardData('resumes').subscribe(data => {
      if (data) {
        const filteredData = data.filter((resume:any) => resume.visibility !== "BAN");

      if (filteredData.length === 30) {
        this.visibleNextPage = true;
      } else {
        this.visibleNextPage = false;
      }
      
      this.selectPage = this.selectPage + 1;
      this.resumes = [...this.resumes, ...filteredData];
      }
      this.loading = false;
    });
  }


  nextPage() {
    if (this.typeToggle === 'vacancy') {
      this.getVacancies();
    }
    if (this.typeToggle === 'resume') {
      this.getResumes();
    }
  }

  searchCards() {
    this.selectPage = 0;
    this.vacancies = [];
    this.resumes = [];
    if (this.typeToggle === 'vacancy') {
      this.getVacancies();
    }
    if (this.typeToggle === 'resume') {
      this.getResumes();
    }
  }


  saveFilters(filters: any): void {
    sessionStorage.setItem('bodyFilters', JSON.stringify(filters));
    this.selectPage = 0;
    this.vacancies = [];
    this.resumes = [];
  }

  clearFilters(): void {
    sessionStorage.removeItem('bodyFilters');
  }

  // toggleSortDirection(): void {
  //   let currentSort = localStorage.getItem('typeSort');
  //   if (currentSort) {
  //     currentSort = currentSort === 'creationDate_desc' ? 'creationDate' : 'creationDate_desc';
  //   } else {
  //     currentSort = 'creationDate_desc';
  //   }
  //   localStorage.setItem('typeSort', currentSort);
  // }

  toggleSort(sortItem: string): void {
    localStorage.setItem('typeSort', sortItem);
    this.loading = true;
    this.selectPage = 0;
    this.resumes = [];
    this.vacancies = [];
    if (this.typeToggle === 'vacancy') {
      this.getVacancies();
    }
    if (this.typeToggle === 'resume') {
      this.getResumes();
    }
    
  }

  saveSort(sort: string): void {
    localStorage.setItem('sort', sort);
  }


  loadData() {
    // this.toggleSortDirection();
    if (this.typeToggle === 'vacancy') {
      this.getVacancies();
    }
    if (this.typeToggle === 'resume') {
      this.getResumes();
    }
    this.loading = false;
  }

  toggleType(type: any) {
    this.typeToggle = type;
    this.loading = true;
    this.selectPage = 0;
    this.resumes = [];
    this.vacancies = [];
    if (type === 'vacancy') {
      this.getVacancies();
    }
    if (type === 'resume') {
      this.getResumes();
    }
  }

}