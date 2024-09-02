import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {



  private stages:any;
  

  constructor(private http: HttpClient) { }
  private domain = 'https://vm-7c43f39f.na4u.ru/api';

  getFunction(): Observable<any> {

      return this.http.get<any>(`${this.domain}/tags`, );

  }

  addFunction(nameStatus: string): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags`, );

  }

  deleteFunction(status_id: number): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags`, );

  }

  putFunction(stage_id: number, newStage: string): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags`, );
  }
}
